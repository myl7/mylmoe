import logging
import base64
import os

import azure.functions as func
import pymongo

uri = os.getenv('CONN_STR')
client = pymongo.MongoClient(uri)
db = client.public
collection = db.kv


def main(_req: func.HttpRequest) -> func.HttpResponse:
    logging.info('received')
    data = collection.find_one({'k': 'arcaea'})

    if data:
        res = base64.b64decode(data['v'])

        logging.info('found')
        return func.HttpResponse(res, mimetype='application/octet-stream')
    else:
        logging.error('not found')
        return func.HttpResponse('Not found', status_code=404)
