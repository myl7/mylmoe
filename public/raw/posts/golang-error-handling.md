---
title: Golang error handling practical tips for personal projects
pubDate: 2023-01-07
updDate: 2023-01-07
tags: error-handling golang
---

<!-- Copyright (C) 2023 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Motivation

I do not want to waste my time again on hesitating to choose which pattern to handle an error in Golang, neither refactoring a bunch of code to fit a new error handling pattern.
So here are some tips to help to choose a fine enough error handling pattern in different situations.
They are from my own Golang personal project experience, which is mainly for academic use but with an engneering expectation.

## Tired of handling errors

- Q: Do you want others to reuse this code?
  - Y -> Always return an error
  - N -> Always panic

## In `main` function

- Q: Does the main has several pretty individual sections?
  - Y -> Always panic still, but panic in the individual section other than `main` after returning from the section
  - N -> Always panic

## In a `Test*` function

Always `t.Fatal`, and even use `t.Run` for sub-testcases so that `t` can be passed

## In a function without calling another function that returns an `error`

- Q: Does the function has failure situations, e.g., `map` access returns `ok == false`?
  - Y -> Return an error, and add a global exported `Err`-prefixed `var` with a custom string to return in the situation
  - N -> So you do not have an error to handle

## In a function that calls another function that returns an `error`

- Q: Do all errors possibly from these called functions can be considered and handled in the function?
  - Y -> So you do not have an error to handle
  - N -> Q: Are these called functions in goroutine?
    - Y -> Use an error channel to collect errors, and return the first error, or wrap them into a single error and return it
    - N -> Return an error
