---
title: myl7's Text Style Guide
pubDate: 2024-08-11
description: >-
  My style guide for texts such as commit messages and comments.
---

## Prerequisites

### Terms and Definitions

We follow the style of IETF material as follows:
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [BCP 14] (including [RFC2119] and [RFC8174]) when, and only when, they appear in all capitals, as shown here.

[BCP 14]: https://datatracker.ietf.org/doc/html/bcp14
[RFC2119]: https://datatracker.ietf.org/doc/html/rfc2119
[RFC8174]: https://datatracker.ietf.org/doc/html/rfc8174

Commonly used terms in this document are described below.

- Period-ended sentence: A sentence that ends with a period.
  Its first letter MUST be capitalized.
  You SHOULD keep the capitalization of proper nouns.
- Non-period-ended sentence: A sentence that does not end with a period.
  Its first letter MUST be capitalized.
  You SHOULD keep the capitalization of proper nouns.

## Whitespaces

We follow [the whitespace definition of GitHub Flavored Markdown Spec] and [the whitespace definition of Wikipedia] to define whitespaces discussed in this document.
Characters and related characters described in Wikipedia MAY be used as whitespaces to enhance the ones of GitHub Flavored Markdown Spec.
However, we specially exclude newlines (`U+000A`) from them.

[the whitespace definition of GitHub Flavored Markdown Spec]: https://github.github.com/gfm/#whitespace-character
[the whitespace definition of Wikipedia]: https://en.wikipedia.org/wiki/Whitespace_character

- All trailing whitespace MUST be trimmed.

  Reason: Hard to see them after rendering.

- Leading whitespace MUST be trimmed unless it has structural significance such as indentation.

  Reason: Shrink text lengths.

- Whitespaces SHOULD only use spaces unless it has structural significance such as indentation of Golang and Makefile.

  Reason: Otherwise, hard to distinguish among different whitespaces.

## Commit Messages

Commit messages are brief descriptions of changes including git commit messages and modification logs (e.g., of Grafana).

We follow [Conventional Commits 1.0.0] to structure commit messages.
Commit messages MUST be structured as follows:

[Conventional Commits 1.0.0]: https://www.conventionalcommits.org/en/v1.0.0/

```txt
<title>

[optional body.]

[optional footer(s)]
```

- `<title>` is usually `<description>`.
  `<title>` MAY be `<type>[optional scope][optional !]: <description>` when conventional commits are required, for example, when changelogs are automatically generated from commit messages.
- `[optional body.]` MUST be zero, one, or more period-ended sentences.
- `[optional footer(s)]` is zero, one, or more items.
  Every item SHOULD be a descriptive period-ended sentence or a trailer generated and defined by [git trailer format].
  Especially, you SHOULD NOT use the `BREAKING CHANGE: <description>` trailer to state breaking changes.
  Use `!` instead.
- `<description>` is a brief non-period-ended sentence.
  Leading articles (grammar) SHOULD be omitted.
  Articles other than leading articles SHOULD be omitted as follows:

  - A word with "a/an" SHOULD be transformed to its plural form.
    In other words, the plural form can be used even when only a single thing is referred to.
  - A word with "the" SHOULD omit "the".

  Reason: Make it as short as possible.

- `<type>` can be types defined in [@commitlint/config-conventional] or [the Angular convention].
  However, you SHOULD prefer `chore(ci)` to `ci`.

  Reason: CI changes are usually small.
  No need to allocate a separate type for them.

- `[optional scope]` is a word or path.
  You SHOULD NOT use a scope unless such a scope is so clear, referred so many times, and relatively a separate module.

  Reason: Avoid uncertainty of the scope of a commit message along with unnecessary complexity.

  However, you SHOULD use the following scopes:
  `chore(ci)`, `chore(deps)`, `chore(release): prepare for`, `chore(pr)`, `chore(pull)`.

- A commit message with `!` (i.e., has `[optional !]`) introduces a breaking API change.

[git trailer format]: https://git-scm.com/docs/git-interpret-trailers
[@commitlint/config-conventional]: https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
[the Angular convention]: https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#commit-message-format

## Comments

Comments are textual descriptive annotations in source code, for example, `// ...` and `/* ... */` in C/C++ and `# ...` in Python.
Comments discussed here do not include doc comments that has special grammars such as [`/// ...` and `//! ...` in Rust].

[`/// ...` and `//! ...` in Rust]: https://doc.rust-lang.org/rust-by-example/meta/doc.html#doc-comments

Comments can be divided into two types: line comments and trailing comments.
Line comments are comments that take a whole line, for example, `// ...` and `# ...`.
Trailing comments are comments that follow a line of code, for example, `int a = 1; // ...` and `a = 1  # ...`.
Block comments such as `/* ... */` in C/C++ belong to line comments.

Unlike line comments, trailing comments can only have one line and is hard to be extended to multiple lines.
We do not discuss multiple-line trailing comments by aligning.
You SHOULD NOT use multiple-line trailing comments.

Reason: The indention of multiple-line trailing comments can change just due to code changes in that line, which causes unnecessarily larger diffs.

- Line comments SHOULD be period-ended sentences.
  Even short comments SHOULD be period-ended sentences.

  Reason: When one more line is added, the prior last line does not need to be added with a period, so that the diff is smaller.

- Trailing comments MAY be non-period-ended sentences.
