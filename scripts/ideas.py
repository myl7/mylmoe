import sys
import subprocess
import os
import json

import yaml


def main():
    assert len(sys.argv) >= 2
    path = sys.argv[1]
    slug = os.path.splitext(os.path.basename(path))[0]
    ideas = parse_ideas(path)
    c = json.dumps(ideas, ensure_ascii=False)
    put_cf_kv('MylmoeIdeaNS', slug, c)


def parse_ideas(path):
    with open(path) as f:
        c = f.read()
    raw_ideas = c.split('\n***\n\n')
    return [parse_idea(raw_idea) for raw_idea in raw_ideas]


def parse_idea(c):
    sep = c.find('\n\n---\n\n')
    fm: dict = yaml.safe_load(c[:sep])
    assert fm.get('id', None)
    assert fm.get('pubTime', None)
    fm['pubTime'] = fm['pubTime'].isoformat()
    body = c[sep + 7:]
    return {**fm, 'body': body}


def put_cf_kv(ns, k, v):
    s = subprocess.run(['wrangler', 'kv:key', 'put', f'--binding={ns}', k, v])
    assert s.returncode == 0


if __name__ == "__main__":
    main()
