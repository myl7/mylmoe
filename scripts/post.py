import sys
import subprocess
import os
import json
import gzip

import yaml


def main():
    assert len(sys.argv) >= 2
    path = sys.argv[1]
    post = parse_post(path)
    c = json.dumps(post, ensure_ascii=False)
    put_cf_kv('MylmoePostNS', post['slug'], c)


def parse_post(path):
    with open(path) as f:
        c = f.read()
    sep = c.find('\n---\n')
    fm: dict = yaml.safe_load(c[:sep])
    assert fm.get('title', None)
    assert fm.get('pubDate', None)
    fm['pubDate'] = fm['pubDate'].isoformat()
    assert fm.get('updDate', None)
    fm['updDate'] = fm['updDate'].isoformat()
    if not fm.get('excerpt', None):
        fm['excerpt'] = ''
    fm['slug'] = os.path.splitext(os.path.basename(path))[0]
    body = c[sep + 5:]
    return {**fm, 'body': body}


def put_cf_kv(ns, k, v):
    s = subprocess.run(['wrangler', 'kv:key', 'put', f'--binding={ns}', k, v])
    assert s.returncode == 0


if __name__ == "__main__":
    main()
