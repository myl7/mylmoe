---
title: Architecture, choices and implementation of mylmoe
pubDate: 2021-01-16
updDate: 2021-01-16
excerpt: Static with React and AWS Amplify, serverless with Cloudflare Workers/KV and Azure Functions/CosmosDB.
tags: blog architecture
---

<!-- Copyright (c) 2020-2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Start

As mylmoe is about to release 3.4.0 soon,
the blog system which also has some other utilities is going to be one more greater.
Looking at the about 400 commits in [myl7/mylmoe](https://myl.moe/myl7/mylmoe) repo,
I believe you can feel the energy I have spent in it.
The post is just to summarize the development process, explain some technical choices, and show the whole architecture.
Wish the post can help you to build up your own blog system or make your blog system better.
(Though I am just a newbie of frontend and serverless.
If some look wrong, feel free to email me to let me know the right one.)

## Graph

!!WIP!!

## Frontend

### Responsive framework: React

I love the simplicity and expandability of React.
The frontend of mylmoe is a SPA with React system, including `react`, `react-router-dom`, `redux`, and `react-redux`
(though `redux` is not a part of React system, but, well, you know it is widely used in React system).

One surprised me is that, unlike `react` and `react-dom`, which is 2 parts of React basic framework,
`react-router` and `react-router-dom` are inclusive, which is that `react-router-dom` is based on `react-router`,
so you should not install the 2 together.

### UI library: Material UI

Material Design is one of my favorite theme.
I have been using it as my IDE theme for years.
Material-UI also has a great documentation, with plenty of examples.

### Static build: AWS Amplify

TTFB is not good, but acceptable.
I choose it other than Azure Static Web Apps is because Azure one does not support root domain.
I just do not want `www` in my domain.
But to use root domain, AWS Amplify requires some extra operations.
I will write another post to describe them. !!WIP!!

## Serverless: FasS and BasS

### Cloudflare Worker

Cloudflare Worker is visualized and easy-to-use.
Integrated with Cloudflare DNS, which can routes specified path to specified worker, Deployment is also easy.
But it only supports js/ts and wasm, which allows the worker to complete work in 10ms, without counting blocking time.
And the local test tool is too slow to use.
Generally it is still a nice FaaS, if you prefer js.
I put all my services on it as long as it can be written in js.

### Cloudflare KV

Cloudflare KV is a distributed KV storage, means the data can be stored in many Cloudflare data centers.
Like Workers, it is also visualized and easy-to-use.
You can even use the admin panel to directly see and edit KV pairs, which Azure CosmosDB can not imagine.
As Cloudflare has make KV free plan open to public recently, It gives me a great experience.
I would prefer to store all my public persistent data on it.
As for private persistent data I would prefer Azure CosmosDB, which gives more security.

### Azure Functions

I prefer Azure Functions other than AWS Lambda, because Azure for Students gives me $100 **per year**.
It is crazily wonderful!
With Azure API Management, I am able to build a production-ready API.
It also supports more language than Cloudflare Worker.

### Azure CosmosDB

Previously I have tried Azure Serverless SQL Database.
For forgetting to enable auto-pause, I spent about $50 in one month, due to computation consumption.
Azure CosmosDB offers free storage space so the cost can be removed.
It provides many different type of API, including SQL, mongo, graph, and table.
I take mongo API.
