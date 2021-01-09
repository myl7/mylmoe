import subprocess
import os
import json
import glob

import yaml


def main():
    paths = glob.glob('works/ideas/*.md')
    slugs = [os.path.splitext(os.path.basename(path))[0] for path in paths]
    c = json.dumps(slugs, ensure_ascii=False)
    put_cf_kv('MylmoeIdeaNS', 'list', c)


def put_cf_kv(ns, k, v):
    s = subprocess.run(['wrangler', 'kv:key', 'put', f'--binding={ns}', k, v])
    assert s.returncode == 0


if __name__ == "__main__":
    main()
