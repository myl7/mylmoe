---
title: Use SSH to deploy in GitHub Action
pubDate: 2020-10-23
updDate: 2021-12-01
excerpt: Do not reinvent the wheel. Use appleboy/ssh-action and appleboy/scp-action.
tags: github-action ssh deploy
lang: en
---

<!-- Copyright (c) 2020-2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Motivation

CD is delicious, liberating our productivity from worrying about trivial deployment things to focus on the code itself.

Recently I am building my blog (which is what you are looking at), and get tired of `scp` `dist` folder to the server, `ssh` login, overwriting previous files, and opening the browser to check if it works.
After setting up GitHub Action as CI, I decided to go further to set up CD too.

## Basic Self Solution

The blog system is just a static site.
All I am required to do is to build the emitted files and put them to the right paths.
So I decide to use a simple deploy script to complete the task.

The output of the script is piped to `/dev/null` for safety.
I also put the script itself into GitHub secrets, and when needing it, `echo` it to a file and `bash` it.

I use `scp` to copy files to the server, with `-q` to suppress output.
I put all server-side operations into a script which is on the server, and use `ssh` with `-t` to execute the script as soon as SSH is connected.

Tests for the script on my development machine gives no problems.
But after committing, pushing, and checking if Github Action feels good, what is wired happened:
CI/CD gives OK, but the files on my server are not updated.

## Found and Solved Problems in Self Solution

### Host

At first, I set the ssh/scp host domain by an alias defined in my local `/etc/hosts`.
After realizing it. I replaced it with the world-wide domain of my blog.

Then I realized again that due to Cloudflare CDN, the blog domain can not refer to my server, but to Cloudflare CDN servers.
So I replaced it again with the server IP.

### GitHub secrets

By adding debug output in GitHub Action, the output is ord but clear: `Bad port '-t'.`
It seems that GitHub secrets did not become envs of the deploy script directly.

After STFW, I found: [Accessing your secrets - Encrypted secrets - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#accessing-your-secrets) with [jobs.<job_id>.env - Workflow syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv), which shows obviously that config update is required to use GitHub secrets as envs.

### SSH perms

One more STFW, I found that: [Self-connecting via SSH on GitHub Actions - Stack Overflow](https://stackoverflow.com/questions/60066477/self-connecting-via-ssh-on-github-actions), which says that GitHub Action worker default file system perms can not satisfy SSH requirements.
`chmod go-rw ~` and `-o 'StrictHostKeyChecking no'` are required.

But after applying all above fixes, it can not still works.
Finally I choosed to find a wheel to reuse.

## Use wheels

I found [appleboy/ssh-action](https://github.com/appleboy/ssh-action) and [appleboy/scp-action](https://github.com/appleboy/scp-action) and finally used them.

Though there is some problems about appleboy/ssh-action (or problems of my code, I am not sure):
Use it to `cp` files with overwriting failed.
So I changed to delete all previous files and move all new files to the position.

appleboy/ssh-action has 762 stars and appleboy/ssh-action has 256 stars.
Their star numbers are not large but enough to show that they are OK for true use.
Using them to get rid of annoying GitHub Action runner environment is indeed a better choice.
