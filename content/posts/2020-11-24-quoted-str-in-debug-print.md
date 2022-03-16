---
title: Quoted string in debug printing
pubDate: 2020-11-24
updDate: 2020-11-24
excerpt: Quoted spring in debug printing may indicate that the spring variable just contains two redundant quotes.
tags: string print debug
---

<!-- Copyright (c) 2020-2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Background

At that time I was writing a Kotlin Spring backend application.
The admin url is protected with HTTP basic authentication.
After setting up Spring authentication configuration bean,
with a property configuration to load properties from `application.properties`,
I used `./gradlew bootRun` to start the development server.
Surprisingly, I found that I can not use the username and password in the
`application.properties` to access the admin url.
The system just reported 401.

## Debug

First I checked the Spring HTTP basic authentication configuration and property loading configuration.
I was new to Spring and Kotlin, Besides Kotlin Spring tutorials are much less than Java Spring ones.
But I could not see where is the problem.
To ensure the HTTP basic authentication is set up correctly, I debug printed the username and password out.
The output looked nice, which is:

```
(Spring info log...)
"username"
"password"
(Spring info log...)
```

(You may have seen the problem.)
Just the same as my config in `application.properties`.
I decided to do a little test: I replace the variables containing the username and password with literals.
Now it works fine!
I was confused: Why literals work but variables not?

## Solution

After struggling for about 2h, I suddenly realized that the output `"username"`
might be not the same as the str of "username".
The output `"uesrname"` indicated that the variable was just "\\"username"\\", including two quotes.
Take a look at my `application.properties`, it contained:

```
(key).username="username"
(key).password="password"
```

which we should remove the quotes in.
Property files just do not need quotes to specify a string.
After removing the quotes, everything works fine.
