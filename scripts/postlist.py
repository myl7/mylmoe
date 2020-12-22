import sys
import subprocess
import os
import json
import glob

import yaml


def main():
    paths = glob.glob('posts/*.md')
    info = [os.path.splitext(os.path.basename(p))[0] for p in paths]
    c = json.dumps(info, ensure_ascii=False)
    put_cf_kv('MylmoePostNS', 'list', c)


def put_cf_kv(ns, k, v):
    s = subprocess.run(['wrangler', 'kv:key', 'put', f'--binding={ns}', k, v])
    assert s.returncode == 0


if __name__ == "__main__":
    main()
