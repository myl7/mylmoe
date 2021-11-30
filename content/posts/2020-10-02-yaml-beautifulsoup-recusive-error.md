---
title: Python YAML + Beautiful Soup reports RecursionError
pubDate: 2020-10-02
updDate: 2020-11-24
excerpt: Prefer safe YAML load/dump functions and explicitly convert Beautiful Soup string to builtin str.
tags: python beautiful-soup yaml html
---

## TOC

## Problem

Today I am writing a Telegram bot.
I choose YAML to display the results for users.
The results are requested by `requests`, parsed by `Beautiful Soup`, and finally dumped by `PyYAML`, which should be a common route.
However, when testing, a strange error comes out:

```
# Tons of traceback info, all from `yaml/representer.py`.
RecursionError: maximum recursion depth exceeded in __instancecheck__
```

But the dumped Python dict is so simple (by `print`ing it out), and you can easily copy and dump it in a Python shell.

After a long time of web searching, I finally realize what I have done.

## Beautiful Soup: `NavigableString`

Let us start with Beautiful Soup.
I find out that I have used `tag.string` to get the text node in HTML and pass it to PyYAML to dump it to readable text.
Here is a point: **Beautiful Soup `tag.string` returns `NavigableString`, other than Python builtin `str`.**
The `NavigableString` carries a reference to the entire Beautiful Soup parsing tree and provides some extra methods that can work on it.
Documentation from [here](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#navigablestring) shows:

> If you want to use a `NavigableString` outside of Beautiful Soup, you should call `unicode()` on it to turn it into a normal Python Unicode string.
> If you don’t, your string will carry around a reference to the entire Beautiful Soup parse tree, even when you’re done using Beautiful Soup.
> This is a big waste of memory.

So we should call `str()` on it to convert `NavigableString` to `str`.

## PyYAML: `safe_dump`

As for PyYAML, [the documentation](https://pyyaml.org/wiki/PyYAMLDocumentation) is not good enough.
As we know YAML can work with complicated objects, YAML libraries usually provide an additional set of safe load/dump functions, which only keep simple but widely-used YAML features.
PyYAML safe dump function can be found [here](https://pyyaml.org/wiki/PyYAMLDocumentation#reference) and [here](https://pyyaml.org/wiki/PyYAMLDocumentation#dumper), which are near documentation page bottom and not shown in the quick start.
Here is the useful text of the documentation:

> `SafeDumper(stream)` produces only standard YAML tags and thus cannot represent class instances and probably more compatible with other YAML processors.
> The functions `safe_dump` and `safe_dump_all` use `SafeDumper` to produce a YAML document.

(By the way, additionally, use `CDumper` to get a much better performance.)

I find I have used `yaml.dump()` in the code, so PyYAML is trying to dump the whole `NavigableString`.
And as it contains a reference to the entire Beautiful Soup parse tree and I have used `tag.string` many times, PyYAML is actually trying to dump the entire HTML tree, even many times!
Easy to Know it will reach the recursive depth limit, which is 1000 without configuring.

After fixing the above mistakes, everything works fine.

## Extra: Recursive Depth Limit

To get the current recursive depth and the limit of it, and mute the very very long recursive error traceback info, I have searched the web and found solutions from Stack Overflow.
Here are them:

```python
# Limit traceback depth.
import sys
sys.tracebacklimit = 1
# Get the recusive depth limit.
sys.getrecursionlimit()
# Set it, default 1000 usually.
sys.getrecursionlimit(1000)
# Get current recusive depth.
import inspect
len(inspect.stack())
```
