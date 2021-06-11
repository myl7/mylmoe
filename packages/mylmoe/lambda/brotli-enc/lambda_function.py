import json
import base64

import brotli


def lambda_handler(event, context):
    src = base64.b64decode(event['body'])
    res = base64.b64encode(brotli.compress(src)).decode()
    return {
        'statusCode': 200,
        'body': res
    }
