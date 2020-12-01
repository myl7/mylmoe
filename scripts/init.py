from pathlib import Path
import os

import yaml
import requests
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv
import pyodbc

load_dotenv()

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
    if not post.get('excerpt', None):
        post['excerpt'] = ''
    return post


posts = []
for post_file in post_files:
    with open(post_file, 'r') as f:
        posts.append(parse_post_file(f.read(), Path(post_file).name))
posts.sort(key=lambda p: p['pubDate'])

odbc_url = os.getenv('MSSQL_ODBC_URL')
conn = pyodbc.connect(odbc_url)
cursor = conn.cursor()
post_sql = 'INSERT INTO post (slug, title, excerpt) VALUES ()'
post_body_sql = 'INSERT INTO postBody (body) VALUES ()'

for post in posts:
    print(post['title'])
    # if res.status_code == 201:
    #     print(f"Create {post['slug']} ok.")
    # else:
    #     print(f"Create {post['slug']} failed: Response body is {res.content.decode()}")
