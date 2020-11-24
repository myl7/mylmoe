from pathlib import Path
from getpass import getpass

import yaml
import requests
from requests.auth import HTTPBasicAuth

post_files = list(Path().glob('./posts/*.md'))
if not post_files:
    print('Can not find post files.')
    exit(1)


def parse_post_file(content: str, filename: str):
    sep = content.find('\n---\n')
    front_matter = yaml.safe_load(content[:sep + 1])
    body = content[sep + 5:]
    post = {}
    for k, v in front_matter.items():
        post[k] = str(v)
    post['body'] = body
    post['slug'] = filename[:-3]
    if not post.get('abstract', None):
        post['abstract'] = ''
    return post


posts = []
for post_file in post_files:
    with open(post_file, 'r') as f:
        posts.append(parse_post_file(f.read(), Path(post_file).name))
posts.sort(key=lambda p: p['pub_date'])

POST_CREATE_URL = 'https://myl.moe' + input('Post create path: ')
ADMIN_USERNAME = input('Admin username: ')
ADMIN_PASSWORD = getpass('Admin password: ')

for post in posts:
    res = requests.post(POST_CREATE_URL, json=post, auth=HTTPBasicAuth(ADMIN_USERNAME, ADMIN_PASSWORD))
    if res.status_code == 201:
        print(f"Create {post['slug']} ok.")
    else:
        print(f"Create {post['slug']} failed: Response body is {res.content.decode()}")
