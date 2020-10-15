import logging
import asyncio
import json

import azure.functions as func
import websockets
import brotli

ARCAEA_PROBER_URL = 'wss://arc.estertion.win:616'
USER_ID = '984569312'


def main(req: func.HttpRequest) -> func.HttpResponse:
    return asyncio.run(handler())


async def handler():
    try:
        data = await ws_arcaea_prober()
    except Exception as e:
        data = str(e)

    return func.HttpResponse(json.dumps(data))


async def ws_arcaea_prober():
    async with websockets.connect(ARCAEA_PROBER_URL) as ws:
        await ws.send(f'{USER_ID} 7 12')

        reply_cmd = await ws.recv()
        if reply_cmd != 'queried':
            raise Exception(f'Not queried reply: {reply_cmd}')

        data = {
            'scores': []
        }

        async for msg in ws:
            if msg == 'bye':
                break

            s = brotli.decompress(msg).decode()
            result = json.loads(s)

            if result['cmd'] == 'songtitle':
                data['songtitle'] = result['data']
            elif result['cmd'] == 'userinfo':
                data['userinfo'] = result['data']
            elif result['cmd'] == 'scores':
                data['scores'].extend(result['data'])
            else:
                raise Exception(f"Unknown data cmd: {result['cmd']}")

    return data
