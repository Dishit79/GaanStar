FROM denoland/deno:alpine

EXPOSE 5000


WORKDIR /app


COPY ./controller ./controller
COPY ./views ./views
COPY main.ts .

RUN apk upgrade
RUN apk add
RUN apk add ffmpeg

CMD ["run", "--allow-all", "main.ts"]
