import logging

import azure.functions as func
import brotli


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        res = brotli.compress(req.get_body())
        return func.HttpResponse(res, mimetype='application/octet-stream')
    except brotli.error as e:
        logging.error(f'brotli enc failed: e={e}')
        return func.HttpResponse(res, status_code=400)
