---
title: Problems with solutions of Azure Cosmos DB
pubDate: 2021-01-21
updDate: 2021-01-21
excerpt: When building an Azure Functions App to access Azure Cosmos DB.
tags: azure-cosmosdb azure debug
---

## Background

Recently I am building an Azure Functions App to communicate with GitHub OAuth.
It includes a part to communicate with Azure Cosmos DB to CURD, using SQL API.
The followings are problems I have faced in the debugging.

## Access

With Azure Functions default config, after setting CORS and minimal TLS to 1.2,
The function is still unable to access Cosmos DB.

Without virtual networks in Azure, to make Azure Functions access Cosmos DB,
`Accept connections from within public Azure datacenters` needs to be enabled,
though Azure warns you to be `cautiously` to enable it.

## Python no event loop

If you are using Python, `asyncio.get_event_loop().run_until_complete(f())` would not work,
as it does not have a default event loop.
You need to create an event loop, or just use Python 3.7 `asyncio.run(f())`.

## Function argument declarations in json

If you are using Python, the generated `function.json` contains function argument declarations.
So if you are going to edit the argument name in Python files, remember to also edit in `function.json`.

As for other languages, some are just in the source files (like C#),
some are like Python, containing some additional config files.

## Python query with `enable_cross_partition_query=True`

If you are using Python, `container.query_items()` requires `enable_cross_partition_query=True`
if you enabled partition, which is the default config.

Other languages may also have this option.

## `id` property

Every document (or say item) in Cosmos DB requires `id` property.
It will generate this property in Azure Cosmos DB Data Explorer, which can be used in browsers,
but not for code calls.

## Wait for the error log

Well, this is not a Cosmos DB problem, but you may just face it when developing.
Azure Application Insights is a little slow, you need to wait for a while to see failures,
and then another while to see exceptions in Application Insights Failures panel.

## Query param name

To run parameterized queries in Cosmos DB, you will use `@a` to refer to a param.
But then when you are providing param values, you should still use `@a` other than `a` as param name.

## Partition key

Partition is enabled in default.
You are required to provide a path to make a property as a partition key, like a primary key.
Then when you are going to run a query, you should provide the partition key value in advance.

At first, I do not understand partition key, and the log just reports that Cosmos DB can not find the document,
which is strange while the document is just in the container.
