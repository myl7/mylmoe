---
title: Sample Markdown post of this blog system
pubDate: 2024-04-16
unlisted: true
description: >-
  The post shows how various Markdown components are rendered in this blog system, and also serves as a test for the Markdown rendering functionality
---

The post shows how various Markdown components are rendered in this blog system, and also serves as a test for the Markdown rendering functionality

## TOC

## Paragraphs and inlines

```md
There was Old World Blues, and New World Hope.
明月松间照，清泉石上流。
夢の歩みを見上げて。
```

There was Old World Blues, and New World Hope.
明月松间照，清泉石上流。
夢の歩みを見上げて。

```md
`Inline code`.
**Bold text**.
_Italic text_.
~~Deleted text~~.
[Inline internal link to this section](#paragraphs-and-inlines).
[External link to this site by link reference definitions][mylmoe].

[mylmoe]: https://myl.moe "myl7's blog"
```

`Inline code`.
**Bold text**.
_Italic text_.
~~Deleted text~~.
[Inline internal link to this section](#paragraphs-and-inlines).
[External link to this site by link reference definitions][mylmoe].

<!-- TODO -->
<!-- <span class="spoiler">Spoiler</span> -->

[mylmoe]: https://myl.moe "myl7's blog"

## Blockquotes and headings

```md
> ## h2
>
> ### h3
>
> #### h4
>
> ##### h5
>
> ###### h6
```

> ## h2
>
> ### h3
>
> #### h4
>
> ##### h5
>
> ###### h6

```md
> Level 1
>
> > Level 2
> >
> > > Level 3
```

> Level 1
>
> > Level 2
> >
> > > Level 3

```md
> A long line that overflows
> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

> A long line that overflows
> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

## Code blocks

````md
```c
printf("Hello, world!");
```
````

```c
printf("Hello, world!");
```

````md
```
printf("Hello, world!");
```
````

```
printf("Hello, world!");
```

````md
```c
printf("The line number becomes wider");
printf("1");
printf("2");
printf("3");
printf("4");
printf("5");
printf("6");
printf("7");
printf("8");
printf("9");
printf("10");
```
````

## Lists

```md
- unordered list
  - item
    - item
```

- unordered list
  - item
    - item

```md
1. ordered list
2. item
3. item
```

1. ordered list
2. item
3. item

```md
- [ ] task list
- [ ] item
- [x] item
```

- [ ] task list
- [ ] item
- [x] item

<!-- TODO -->
<!-- ## Images -->

## Tables and deviders

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

```md
| table | a   | b   | c                                                                                                    |
| ----- | --- | --- | ---------------------------------------------------------------------------------------------------- |
| a     | /   | 1   | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| b     | 1   | /   | /                                                                                                    |
```

| table | a   | b   | c                                                                                                    |
| ----- | --- | --- | ---------------------------------------------------------------------------------------------------- |
| a     | /   | 1   | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| b     | 1   | /   | /                                                                                                    |

```md
---
```

---

## Expand/collapse

```md
<details>
<summary>Just use HTML details & summary</summary>

Then things will be fine

</details>
```

<details>
<summary>Just use HTML details & summary</summary>

Then things will be fine

</details>

## Comments

```md
<!-- Comment -->
```

<!-- Comment -->

## HTML inlines/blocks

```md
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

```md
<a href="https://github.com/myl7/mylmoe" title="title">myl7/mylmoe</a> is the <strong>repository</strong> of this blog system.
```

<a href="https://github.com/myl7/mylmoe" title="title">myl7/mylmoe</a> is the <strong>repository</strong> of this blog system.

## LaTeX math inlines/blocks

```md
$x_1 = \frac{-b + \sqrt{b^2-4ac}}{2a}$ and $$x_2 = \frac{-b - \sqrt{b^2-4ac}}{2a}$$
```

$x_1 = \frac{-b + \sqrt{b^2-4ac}}{2a}$ and $$x_2 = \frac{-b - \sqrt{b^2-4ac}}{2a}$$

```md
$$
\Delta = (\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a})^2 + (\frac{c}{3a} - \frac{b^2}{9a^2})^3
$$
```

$$
\Delta = (\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a})^2 + (\frac{c}{3a} - \frac{b^2}{9a^2})^3
$$

```md
$$
x_1 = -\frac{b}{3a} + \sqrt[3]{\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a} + \sqrt{\Delta}} + \sqrt[3]{\frac{bc}{6a^2} - \frac{b^3}{27a^2} - \frac{d}{2a} - \sqrt{(\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a})^2 + (\frac{c}{3a} - \frac{b^2}{9a^2})}}
$$
```

$$
x_1 = -\frac{b}{3a} + \sqrt[3]{\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a} + \sqrt{\Delta}} + \sqrt[3]{\frac{bc}{6a^2} - \frac{b^3}{27a^2} - \frac{d}{2a} - \sqrt{(\frac{bc}{6a^2} - \frac{b^3}{27a^3} - \frac{d}{2a})^2 + (\frac{c}{3a} - \frac{b^2}{9a^2})}}
$$

<!-- TODO -->
<!-- ## Admonitions -->
