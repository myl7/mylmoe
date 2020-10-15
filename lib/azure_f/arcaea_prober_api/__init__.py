import logging
import asyncio
import json
from datetime import datetime

import azure.functions as func
import websockets
import brotli

ARCAEA_PROBER_URL = 'wss://arc.estertion.win:616'
USER_ID = '984569312'


def main(req: func.HttpRequest) -> func.HttpResponse:
    return asyncio.run(handleReq(req))


async def handleReq(_req):
    try:
        data = await ws_arcaea_prober()
        data = await process_data(data)
        body = json.dumps(data)
        logging.info('success')
    except Exception as e:
        body = str(e)
        logging.error(e)
    return func.HttpResponse(body)


async def ws_arcaea_prober():
    async with websockets.connect(ARCAEA_PROBER_URL) as ws:
        # Send query cmd.
        await ws.send(f'{USER_ID} 7 12')

        # Reply query success.
        reply_cmd = await ws.recv()
        if reply_cmd != 'queried':
            raise Exception(f'queried failed: {reply_cmd}')

        data = {
            'scores': []
        }

        async for msg in ws:
            # End with `byte`.
            if msg == 'bye':
                break

            s = brotli.decompress(msg).decode()
            result = json.loads(s)
            query_cmd = result.get('cmd', 'no query cmd')

            if query_cmd == 'scores':
                data['scores'].extend(result['data'])
            elif query_cmd == 'userinfo':
                data['userinfo'] = result['data']
            elif query_cmd == 'songtitle':
                data['songtitle'] = result['data']
            else:
                raise Exception(f'unknown query cmd: {query_cmd}')

        return data


async def process_data(data):
    user_info = data['userinfo']
    song_titles = data['songtitle']
    songs = data['scores']

    async def get_name(song_id):
        titles = song_titles.get(song_id, None)
        if titles is None:
            raise Exception('unknown song id: no song id')
        else:
            # Prefer ja title to en.
            jp_name = titles.get('ja', None)
            if jp_name:
                return jp_name
            else:
                return titles['en']

    song_infos = []
    for song in songs:
        # Filter non-FTR songs.
        if song['difficulty'] < 2:
            continue

        song_info = {
            'id': song['song_id'],
            'title': await get_name(song['song_id']),
            'score': song['score'],
            'count': {
                'strict_pure': song['shiny_perfect_count'],
                'pure': song['perfect_count'],
                'far': song['near_count'],
                'lost': song['miss_count']
            },
            'health': song['health'],
            'play_date': datetime.utcfromtimestamp(song['time_played'] / 1000).isoformat(),
            'get_date': datetime.utcfromtimestamp(song['song_date'] / 1000).isoformat(),
            'clear_type': [
                'Track Lost', 'Easy Clear', 'Normal Clear', 'Head Clear', 'Full Recall', 'Pure Memory'
            ][song['best_clear_type']],
            'constant': song['constant'],
            'rating': song['rating']
        }
        song_infos.append(song_info)

    song_infos.sort(key=lambda info: -info['constant'])

    return {
        'songs': song_infos,
        'user_info': {
            'id': user_info['user_id'],
            'name': user_info['name'],
            'recent_song_id': user_info['recent_score'][0]['song_id'],
            'join_date': datetime.utcfromtimestamp(user_info['join_date'] / 1000).isoformat(),
            'ptt': user_info['rating'],
            'code': user_info['user_code']
        }
    }
