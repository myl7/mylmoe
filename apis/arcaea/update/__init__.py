import datetime
import logging
import base64
import json
import gzip
import asyncio
import os

import azure.functions as func
from azure import cosmos
import brotli
import websockets

uri = os.getenv('URI')
key = os.getenv('KEY')


def main(timer: func.TimerRequest) -> None:
    logging.info('start at ' + now())

    if timer.past_due:
        logging.warning('the timer is past due')

    data = asyncio.get_event_loop().run_until_complete(req_prober())
    data = json.dumps(data, ensure_ascii=False).encode()
    data = gzip.compress(data)
    data = base64.b64encode(data).decode()

    client = cosmos.CosmosClient(uri, key)
    db = client.get_database_client('public')
    container = db.get_container_client('arcaea')
    container.replace_item('latest', {'data': data})
    logging.info('ok at ' + now())


prober_uri = 'wss://arc.estertion.win:616'
query = '984569312 7 12'


async def req_prober():
    res = []
    async with websockets.connect(prober_uri) as ws:
        await ws.send(query)

        reply = await ws.recv()
        if reply != 'queried':
            raise ReqProberError('query failed: reply=' + reply)

        while True:
            src = await ws.recv()

            if isinstance(src, str) and src == 'bye':
                break

            data = brotli.decompress(src).decode()
            data = json.loads(data)
            res.append(data)

    titles = res[0]['data']
    user_info = res[1]['data']
    res.pop(0)
    res.pop(0)
    songs = []
    for i in res:
        for song in i['data']:
            song['title'] = titles[song['song_id']]
            songs.append(song)

    return {'userInfo': user_info, 'songs': songs}


class ReqProberError(Exception):
    pass


def now():
    return datetime.datetime.utcnow().isoformat()
