---
title: 'Demo of mylmoe: self-written frontend blog system'
createdDate: 2022-08-21
updatedDate: 2022-08-23
abstract: mylmoe v0.5 is released now after the 5th refactoring/rewriting. The post shows demos of various supported Markdown syntax/features/extensions.
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

```

```
````

```c
printf("Hello, world!");
```

```
printf("Hello, world!");
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

### Links & images

With Link reference definitions

```md
[foo]: /url 'link ref def'

[link](https://github.com/myl7/mylmoe 'title') [link][foo]

![black image](data:image/png;base64,iVBORw0K...)

![white image](data:image/png;base64,iVBORw0K...)
```

[foo]: /url 'link ref def'

[link](https://github.com/myl7/mylmoe 'title') [link][foo]

![image](data:image/png;base64,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)

![](data:image/png;base64,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)

Notice that images are reset to become block elements by default other than inline elements

### Comments

Since highlight.js has no MDX support, Markdown/HTML comments can be used for Markdown posts:

```md
<!-- comment -->
```

If you are writting a MDX post, use MDX comments:

<!-- prettier-ignore -->
```jsx
{/* comment */}
```

### HTML blocks/inlines

```md
<a href="https://github.com/myl7/mylmoe" title="title">link</a>
<button onclick="alert(1)">Do NOT click me!</button>

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
<button onclick="alert(1)">Do NOT click me!</button>

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
`"alert(1)"` would be parsed to a string and passed to **React** `onClick` event handler, causing no effects.
Additionally an error would be raised in Next.js development mode.
