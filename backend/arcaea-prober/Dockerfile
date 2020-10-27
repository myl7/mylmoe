FROM python:alpine

RUN apk add gcc g++ libc-dev -t build \
 && pip install websockets brotli \
 && apk del build

COPY ./gen_arcaea_prober.py /app/gen_arcaea_prober.py

RUN echo 'python /app/gen_arcaea_prober.py' >> /etc/periodic/daily/arcaea-prober \
 && chmod a+x /etc/periodic/daily/arcaea-prober

ENTRYPOINT ["python", "/app/gen_arcaea_prober.py", "&&", "crond", "-f", "-l", "1"]
