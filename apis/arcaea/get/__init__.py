import logging
import base64
import os

import azure.functions as func
from azure import cosmos

uri = os.getenv('URI')
key = os.getenv('KEY')


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('received')

    client = cosmos.CosmosClient(uri, key)
    db = client.get_database_client('public')
    container = db.get_container_client('arcaea')
    data = list(container.query_items('SELECT * FROM c WHERE c.id = "latest"'))

    if data:
        data = data[0]['data']
        res = base64.b64decode(data)

        logging.info('found')
        return func.HttpResponse(res, mimetype='application/octet-stream')
    else:
        logging.error('not found')
        return func.HttpResponse('Not found', status_code=404)
