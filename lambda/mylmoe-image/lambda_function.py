import io
import base64

import boto3
from PIL import Image


def lambda_handler(event, context):
    qs = event['queryStringParameters']
    path = qs['p']
    width = qs.get('w', None)
    height = qs.get('h', None)
    if width is None and height is None:
        raise Exception('Require at least one of width and height')

    s3 = boto3.client('s3')
    res = s3.get_object(Bucket='mylmoe', Key=path)
    image = Image.open(res['Body'])

    w, h = image.size
    if height:
        height = int(height)
    else:
        height = int(int(width) / w * h)
    if width:
        width = int(width)
    else:
        width = int(int(height) / h * w)
    image = image.resize((width, height))
    f = io.BytesIO()
    image.save(f, 'WEBP')

    f.seek(0)
    body = base64.b64encode(f.read())
    return {
        'statusCode': 200,
        'headers': {'Content-Type': res['ContentType']},
        'body': body,
        'isBase64Encoded': True
    }
