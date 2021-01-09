import sys
import subprocess
import os
import json
import glob

import yaml


def main():
    paths = glob.glob('posts/*.md')
    info = [parse_post(p) for p in paths]
    c = json.dumps(info, ensure_ascii=False)
    put_cf_kv('MylmoePostNS', 'list', c)


def parse_post(path):
    with open(path) as f:
        c = f.read()
    sep = c.find('\n\n---\n\n')
    fm: dict = yaml.safe_load(c[:sep])
    assert fm.get('title', None)
    assert fm.get('pubDate', None)
    fm['pubDate'] = fm['pubDate'].isoformat()
    assert fm.get('updDate', None)
    fm['updDate'] = fm['updDate'].isoformat()
    if not fm.get('excerpt', None):
        fm['excerpt'] = ''
    fm['slug'] = os.path.splitext(os.path.basename(path))[0]
    return fm


def put_cf_kv(ns, k, v):
    s = subprocess.run(['wrangler', 'kv:key', 'put', f'--binding={ns}', k, v])
    assert s.returncode == 0


if __name__ == "__main__":
    main()
