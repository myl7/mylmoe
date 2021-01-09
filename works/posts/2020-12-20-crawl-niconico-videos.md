title: Crawl niconico videos
pubDate: 2020-12-20
updDate: 2020-12-20
excerpt: nndownload works fine.

---

## Requirement

To download all videos in a niconico channel.
It is about 100 videos, have been paid with my account, so the downloader should be able to use it.

## Prefetch

First of all, I should get all the video links.
Here I used a kind of manual way.
I open all video list pages into tabs in one browser window.
Then use the Chrome extension `SingleFile` to save all tabs into HTML.
Finally extract the required links out.
Here is my script to make it:

```python
import re
import glob

from bs4 import BeautifulSoup

res = []

files = glob.glob('pages/*.html')
files.sort()
for i in range(len(files)):
    with open(files[i]) as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    link_elems = soup.select('li.item > div.item_right > h6 > a')
    links = list(map(lambda e: str(e['href']) + '\n', link_elems))

    if i != len(files) - 1:
        print(files[i], len(links))
        assert len(links) == 20
    else:
        print(files[i], len(links))
        assert len(links) <= 20

    res.extend(links)

with open('links.txt', 'w') as f:
    f.writelines(res)
```

It uses `Beautiful Soup` to parse HTML, select with the CSS selector, check link number, and output.

## Library

Searching on the web, I found [`nndownload`](https://github.com/AlexAplin/nndownload), which is actively developed.
After solving some misc problems, I installed it and took a try. Just great.

## Machine

I have a VPS with 1 CPU core, 512M memory, and 10G disk, not great.
Thanks to that download is an IO-intensive task, the download itself should not be a problem.
But 10G disk, which has only about 3G free space, is surely unable to store the videos.
I decided to move the videos to Azure blob storage as long as the download is finished.
To archive it, I made a script.

## Script

The script is:

```bash
#!/bin/bash
set -euo pipefail

while IFS= read -r line; do
  nndownload.py -u <my account> -p <my password> "$line" \
  || (
    echo -e "\033[31m ERROR download $line \033[0m" \
    && rm -f "$(basename $line)"*.mp4 \
    && continue
  )
  rclone copy "$(basename $line)"*.mp4 <my storage> \
  || (
    echo -e "\033[31m ERROR send $line \033[0m" \
    && continue
  )
  rm "$(basename $line)"*.mp4
done < dl.txt
```

There are some interesting parts in the script:

`while IFS= read -r line; do ...; done < dl.txt` will read from `dl.txt` file line by line.
In the `dl.txt` file it is the video links line by line fetched previously.
This is the way in a bash script to generate line by line input from a file.
Also, be careful about the input variable, it is `$line` not `$IFS`.

Every command is executed with error handling.
And the error message will be printed with red text, making it easier to see them in the long log.

We use `rclone` to connect to the Azure blob storage.
Rclone is a command-line tool to manage cloud storage, supporting a lot of backends, including Azure blob storage.
We run the move command as a post command after the download is finished.

## Use

To track the script output and status and allow it to continue working after I exited the SSH shell,
I run it in a `tmux` session.
Then what I can do is waiting.
The download speed is not good, about 200KB/s, but surprisingly no error occurs.
After about a week, the download for all videos finished fine.
