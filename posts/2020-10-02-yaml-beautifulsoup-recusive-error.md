title: Python YAML + Beautiful Soup reports RecursionError
pub_date: 2020-10-02
upd_date: 2020-11-24
abstract: Use YAML safe functions and explicitly convert Beautiful Soup string to str.
---

## Problem

Today I am writing a Telegram bot.
I choose YAML to display the results for users.
The results are requested by `requests`, parsed by `Beautiful Soup`, and finally dumped by `PyYAML`, which is a common plan.
However, when testing, a strange error comes out:

```
# Tons of traceback info, all from `yaml/representer.py`.
RecursionError: maximum recursion depth exceeded in __instancecheck__
```

But the dumped Python dict is just simple, and you can easily copy it and dump it in a Python shell.

After a long time of web searching, I finally realize what I have done.

## Beautiful Soup: `NavigableString`

Let us start with Beautiful Soup.
I find out that I have used `tag.string` to get the text node in HTML and pass it to PyYAML to dump it to readable text.
Here is a point: **Beautiful Soup `tag.string` returns `NavigableString`, not Python builti-in `str`.**
The `NavigableString` carries a reference to the entire Beautiful Soup parse tree and provides some extra methods that working on it.
The original documentation text from [here](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#navigablestring) is:

> If you want to use a `NavigableString` outside of Beautiful Soup, you should call `unicode()` on it to turn it into a normal Python Unicode string.
> If you don’t, your string will carry around a reference to the entire Beautiful Soup parse tree, even when you’re done using Beautiful Soup.
> This is a big waste of memory.

So we should call `str()` to convert `NavigableString` to `str`.

## PyYAML: `safe_dump`

As for PyYAML, [the documentation](https://pyyaml.org/wiki/PyYAMLDocumentation) is not good.
As we (may) know YAML can work on complicated Python objects, and the libraries usually provide an additional set of safe functions, which avoids this.
PyYAML safe dump function can be found [here](https://pyyaml.org/wiki/PyYAMLDocumentation#reference) and [here](https://pyyaml.org/wiki/PyYAMLDocumentation#dumper), which are at the nearly bottom, and not shown in the quick start.
Here is a useful text:

> `SafeDumper(stream)` produces only standard YAML tags and thus cannot represent class instances and probably more compatible with other YAML processors.
> The functions `safe_dump` and `safe_dump_all` use `SafeDumper` to produce a YAML document.

(Additionally, use `CDumper` to get a lot better performance.)
I found I have used `yaml.dump()`, so the PyYAML try to dump the `NavigableString`, and as it contains a reference to the entire Beautiful Soup parse tree, and I have used `tag.string` many times, the PyYAML is trying to dump the entire tree many times!
Easy to guess it reaches the recursive depth limit, which is 1000 without editing.

After fixing the above mistakes, Everything works fine.

## Additionally

To get the current recursive depth and the limit of it, and mute the very very long recursive error traceback info, I have searched the web, finding them on Stack Overflow.
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
