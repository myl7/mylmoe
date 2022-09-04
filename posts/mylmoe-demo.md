---
title: 'Demo of mylmoe: self-written frontend blog system'
createdDate: 2022-08-21
updatedDate: 2022-09-05
abstract: mylmoe v0.5 (which is what you are viewing) is released now after the 5th refactoring/rewriting. The post shows demos of various supported Markdown syntax/features/extensions.
tags: demo markdown mdx gfm mylmoe
---

<!-- Copyright (C) 2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Features

The following remark/rehype plugins are used to enhance Markdown/MDX:

- remark-gfm: GFM (GitHub Flavored Markdown) support
- rehype-highlight: Highlight code blocks with [highlight.js](https://github.com/highlightjs/highlight.js)
- remark-math + rehype-katex: LaTeX math (inline/block) support with [KaTeX](https://github.com/KaTeX/KaTeX)
- rehype-slug + remark-toc: Heading links and auto-generated TOC
- remark-directive + remark-directive-rehype: Preparation for custom elements

## Demos

### Dividers

```md
---
```

---

### Headings

```md
## h2

### h3

#### h4
```

#### h4

Auto-generated TOC of the headings and styles of headings except h4 can be found elsewhere in the page

### Code blocks

````md
```c
printf("Hello, world!");
```

```
printf("Hello, world!");
```

```c
;
```

```

```
````

```c
printf("Hello, world!");
```

```
printf("Hello, world!");
```

```c
;
```

```

```

### Paragraphs

```md
paragraph a1
paragraph a2

paragraph b
```

paragraph a1
paragraph a2

paragraph b

### Tables

```md
| table | a   | b   |
| ----- | --- | --- |
| a     | /   | 1   |
| b     | 1   | /   |
```

| table | a   | b   |
| ----- | --- | --- |
| a     | /   | 1   |
| b     | 1   | /   |

### Blockquotes

```md
> blockquote
>
> > blockquote
> >
> > > blockquote
```

> blockquote
>
> > blockquote
> >
> > > blockquote

### Lists

```md
- unordered list
  - list
    - list

1. ordered list
2. list
3. list

- [ ] task list
- [x] task list
```

- unordered list
  - list
    - list

1. ordered list
2. list
3. list

- [ ] task list
- [x] task list

### Inlines

```md
`inline code` _em_ **strong** ~~del~~
```

`inline code` _em_ **strong** ~~del~~

### Links

With Link reference definitions

```md
[foo]: /url 'link ref def'

[link](https://github.com/myl7/mylmoe 'title') [link][foo]
```

[foo]: /url 'link ref def'

[link](https://github.com/myl7/mylmoe 'title') [link][foo]

### Images

Support both `![]()` Markdown-style images and `<img>` HTML-style images.
Support both relative path for backward compatibility and absolute path.
Support both inline/remote images and local images.

<!-- Local images can (fully) work with Next.js image optimization. -->

```md
![relative path, Markdown-style](../public/images/pixiv_86286793_p0.jpg)

<img src="/images/pixiv_86286793_p0.jpg" alt="absolute path, HTML-style, with props" width="500px" />
```

![relative path, Markdown-style](../public/images/pixiv_86286793_p0.jpg)

<img src="/images/pixiv_86286793_p0.jpg" alt="absolute path, HTML-style, with props" width="500px" />

_License notice_: The above (2 the same) image is **NOT** licensed under the default license. **ALL RIGHTS ARE RESERVED.** The image is downloaded by us from https://www.pixiv.net/artworks/86286793 on Pixiv on 2022-09-01, made and owned by MISSILE228. Here we used with permission according to [their Pixiv description](https://www.pixiv.net/users/429077):

> 作品に関しては、「他作品等への提供物ではないもの・オリジナル作品」は転載（SNS や掲示板への掲載等）を許可します（趣味イラストなど）（常識的な範囲内での転載行為は許可してるので、メッセージでのご連絡などは無くても大丈夫です）

Notice that images are CSS-reset to become block elements by default other than inline elements

### Details & summary a.k.a. expand/collapse

```md
<details>
<summary>Just use HTML details & summary</summary>

Then things will be done finely

</details>
```

<details>
<summary>Just use HTML details & summary</summary>

Then things will be done finely

</details>

### Admonitions

Use directives with `admonition` or `admon` as the name to create admonitions.
Specify `type` to set the type of admonition.
`type` is case-insensitive.
Available types and respective styles are from [admonitions of Material for MkDocs](https://squidfunk.github.io/mkdocs-material/reference/admonitions/).
Specify `title` to set the admonition title.
Or set `autoTitle` to true value (only `autoTitle` is not enough since it is parsed to `autoTitle=""`) to automatically get the title from the first non-empty text block (`p`) of the content.
Like Material for MkDocs, without specifying the title, the admonition will have the title defaulting to the capitalized type name.

```md
:::::admonition{type="note"}
::::admonition{type="aBsTrAcT"}
Type is case-insensitive

:::admon{type="info"}
Nested admonitions

You can abbreviate `admonition` to `admon`
:::
::::
:::::

:::admonition{type="tip", title="Custom title"}
Tip
:::

:::admonition{type="success", autoTitle="1"}
Success

Automatically get the title from the first non-empty text block of the content
:::

:::admonition{type="question"}
Question
:::

:::admonition{type="warning"}
Warning
:::

:::admonition{type="failure"}
Failure
:::

:::admonition{type="danger"}
Danger
:::

:::admonition{type="bug"}
Bug
:::

:::admonition{type="example"}
Example
:::

:::admonition{type="quote"}
Quote
:::
```

:::::admonition{type="note"}
::::admonition{type="aBsTrAcT"}
Type is case-insensitive

:::admon{type="info"}
Nested admonitions

You can abbreviate `admonition` to `admon`
:::
::::
:::::

:::admonition{type="tip" title="Custom title"}
Tip
:::

:::admonition{type="success" autoTitle="1"}
Success

Automatically get the title from the first non-empty text block of the content
:::

:::admonition{type="question"}
Question
:::

:::admonition{type="warning"}
Warning
:::

:::admonition{type="failure"}
Failure
:::

:::admonition{type="danger"}
Danger
:::

:::admonition{type="bug"}
Bug
:::

:::admonition{type="example"}
Example
:::

:::admonition{type="quote"}
Quote
:::

### Comments

Markdown/HTML comments can be used for Markdown posts:

```md
<!-- comment -->
```

If you are writting a MDX post, use MDX comments:

<!-- prettier-ignore -->
```jsx
{/* comment */}
```

Since highlight.js has no MDX support, here the code block for MDX is using JSX as the language

### HTML inlines/blocks

```md
<a href="https://github.com/myl7/mylmoe" title="title">link</a>
<button onclick="alert(1)" style="border-width: 1px">Do NOT click me!</button>

<div style="display: flex; gap: 30px">
<div>

- unordered list
  - list
    - list

</div>
<div>

1. ordered list
2. list
3. list

</div>
</div>
```

<a href="https://github.com/myl7/mylmoe" title="title">link</a>
<button onclick="alert(1)" style="border-width: 1px">Do NOT click me!</button>

<div style="display: flex; gap: 30px">
<div>

- unordered list
  - list
    - list

</div>
<div>

1. ordered list
2. list
3. list

</div>
</div>

Notice that `onclick="alert(1)"` would not work.
`"alert(1)"` would be parsed as a string and passed to **React** `onClick` event handler, causing no effects.
Additionally an error would be raised in Next.js development mode.

### LaTeX math inlines/blocks

```md
$x = \frac{-b\plusmn\sqrt{b^2-4ac}}{2a}$

$$
x_1 = -\frac{b}{3a} + \sqrt[3]{\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a} + \sqrt{\Delta}} + \sqrt[3]{\frac{bc}{6a^2} - \frac{b^3}{27a^2} - \frac{d}{2a} - \sqrt{(\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a})^2 + (\frac{c}{3a} - \frac{b^2}{9a^2})}}
$$

$$
\Delta = (\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a})^2 + (\frac{c}{3a} - \frac{b^2}{9a^2})^3
$$
```

$x = \frac{-b\plusmn\sqrt{b^2-4ac}}{2a}$

$$
x_1 = -\frac{b}{3a} + \sqrt[3]{\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a} + \sqrt{\Delta}} + \sqrt[3]{\frac{bc}{6a^2} - \frac{b^3}{27a^2} - \frac{d}{2a} - \sqrt{(\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a})^2 + (\frac{c}{3a} - \frac{b^2}{9a^2})}}
$$

$$
\Delta = (\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a})^2 + (\frac{c}{3a} - \frac{b^2}{9a^2})^3
$$

### MDX deviations

MDX is slightly different from both Markdown and JSX in the corresponding parts.
Refer to the [Deviations from Markdown](https://github.com/micromark/mdx-state-machine#72-deviations-from-markdown) and [Deviations from JSX](https://github.com/micromark/mdx-state-machine#73-deviations-from-jsx) sections for details.
