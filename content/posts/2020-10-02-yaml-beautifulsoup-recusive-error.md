---
title: Python YAML + Beautiful Soup reports RecursionError
pubDate: 2020-10-02
updDate: 2020-11-24
excerpt: Prefer safe YAML load/dump utilities and explicitly convert Beautiful Soup string to builtin str.
tags: python beautiful-soup yaml html serialization recursion
lang: en
---

## TOC

## Problem

Today I am writing a Telegram bot.
I choosed YAML to display the results for users.
The results are requested by `requests`, parsed by `Beautiful Soup`, and finally dumped by `PyYAML`, which should be common enough.
However, when testing, a strange error comes out:

```
# Tons of traceback info, while all are from `yaml/representer.py`.
RecursionError: maximum recursion depth exceeded in __instancecheck__
```

But the dumped Python object (a dict) is so simple (known by `print` it out), and you can easily copy it to another Python shell and dump it without problems.

After a long time of searching and analysis, I finally realized what I have done, and why the code would fail.

## Beautiful Soup: `NavigableString`

Let us start with Beautiful Soup.
I find out that I have used `tag.string` to get the text node in HTML and pass it to PyYAML to dump it to readable text.

Here is the point: **Beautiful Soup `tag.string` returns `NavigableString`, other than Python builtin `str`.**
The `NavigableString` carries a reference to the entire Beautiful Soup parsing tree and provides some extra methods that can work on it.
Documentation from [here](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#navigablestring) shows:

> If you want to use a `NavigableString` outside of Beautiful Soup, you should call `unicode()` on it to turn it into a normal Python Unicode string.
> If you don’t, your string will carry around a reference to the entire Beautiful Soup parse tree, even when you’re done using Beautiful Soup.
> This is a big waste of memory.

**So we should call `str()` on it to convert `NavigableString` to `str`.**

## PyYAML: `safe_dump`

As for PyYAML, [its documentation](https://pyyaml.org/wiki/PyYAMLDocumentation) is not good enough.
As we all know while YAML can work with complicated objects, YAML libraries usually provide an additional set of safe load/dump utilities, which only keep simple but widely-used YAML features.

PyYAML safe dump utilites can be found [here](https://pyyaml.org/wiki/PyYAMLDocumentation#reference) and [here](https://pyyaml.org/wiki/PyYAMLDocumentation#dumper), which are all near documentation page bottom and not shown in quick start.
Here is the useful text of the documentation:

> `SafeDumper(stream)` produces only standard YAML tags and thus cannot represent class instances and probably more compatible with other YAML processors.
> The functions `safe_dump` and `safe_dump_all` use `SafeDumper` to produce a YAML document.

(By the way, additionally, use `CDumper` to get a much better performance.)

I found I had used `yaml.dump()` in the code, which means PyYAML is trying to dump the whole `NavigableString` including references it holds.

And as it contains a reference to the entire Beautiful Soup parsing tree, and I have used `tag.string` many times, now PyYAML is actually trying to dump the entire HTML tree, even many times!
Not surprised to see it reached recursive depth limit, which is 1000 in default.

**Now what we should do for it is to change to use safe load/dump utilities.**

After fixing the above mistakes, everything works fine.

## Extra: Recursive Depth

To get or change current recursive depth and its limit, plus to mute the so long recursive error traceback log, after searching, I found solutions from Stack Overflow which are:

```python
# Limit traceback depth.
import sys
sys.tracebacklimit = 1
# Get the recusive depth limit.
sys.getrecursionlimit()
# Set it, 1000 in default usually.
sys.getrecursionlimit(1000)
# Get current recusive depth.
import inspect
len(inspect.stack())
```
