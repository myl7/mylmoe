FROM python:alpine

RUN apk add gcc g++ libc-dev -t build \
 && pip install websockets brotli \
 && apk del build

ENV EMIT_PATH=/var/www/mlblog-apis/apis/arcaea-prober.json.js
ENV DB_PATH=/var/db/arcaea-prober/results.sqlite

RUN mkdir -p /var/www/mlblog-apis/apis /var/db/arcaea-prober/

COPY ./gen_arcaea_prober.py /app/gen_arcaea_prober.py

RUN echo 'python /app/gen_arcaea_prober.py' >> /etc/periodic/daily/arcaea-prober \
 && chmod a+x /etc/periodic/daily/arcaea-prober

VOLUME /var/www/mlblog-apis
VOLUME /var/db/arcaea-prober

ENTRYPOINT ["python", "/app/gen_arcaea_prober.py", "&&", "crond", "-f", "-l", "1"]
