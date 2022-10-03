#!/usr/bin/env rust-script

//! Copyright (C) 2022 myl7
//! SPDX-License-Identifier: Apache-2.0
//!
//! Check if some paths will be blocked by adblockers,
//! since Next.js will fetch the page JSON metadata whose path ends like `share.json?...`.
//!
//! ```cargo
//! [dependencies]
//! reqwest = { version = "0.11", features = ["blocking"] }
//! adblock = "0.5"
//! ```

use adblock::engine::Engine;
use adblock::lists::{FilterSet, ParseOptions};
use std::env;
use std::io::Read;

static FILTER_URLS: &'static [&'static str] = &[
    "https://secure.fanboy.co.nz/fanboy-social.txt",
    "https://secure.fanboy.co.nz/fanboy-annoyance.txt",
];

fn main() {
    let sitemap_url = env::args()
        .nth(1)
        .unwrap_or("http://localhost:3000/sitemap.xml".to_owned());
    let urls_body = req_get(&sitemap_url);
    let urls = urls_body
        .lines()
        .map(|line| line.trim())
        .filter(|line| !line.is_empty())
        .collect::<Vec<_>>();

    let matched = FILTER_URLS
        .iter()
        .map(|filter_url| {
            println!("Filter: {}", filter_url);
            let rules = req_get(filter_url);
            let filter_matched = filter_check(&rules, &urls);
            if filter_matched {
                println!();
                true
            } else {
                println!("No matched\n");
                false
            }
        })
        .reduce(|a, b| a || b)
        .unwrap_or(false);
    if matched {
        std::process::exit(1);
    }
}

fn req_get(url: &str) -> String {
    let mut res = reqwest::blocking::get(url).unwrap();
    let mut body = String::new();
    res.read_to_string(&mut body).unwrap();
    body
}

fn filter_check(rules: &str, urls: &Vec<&str>) -> bool {
    let mut filter_set = FilterSet::new(true);
    filter_set.add_filter_list(rules, ParseOptions::default());
    let blocker = Engine::from_filter_set(filter_set, true);
    urls.iter()
        .map(|url| {
            let result = blocker.check_network_urls(url, "", "");
            if result.matched {
                println!("{} is matched by rule {}", url, result.filter.unwrap());
                return true;
            }
            let json_url = url.strip_suffix("/").unwrap_or(url).to_owned() + ".json?a=b";
            let result = blocker.check_network_urls(&json_url, "", "");
            if result.matched {
                println!("{} is matched by rule {}", json_url, result.filter.unwrap());
                return true;
            }
            false
        })
        .reduce(|a, b| a || b)
        .unwrap_or(false)
}
