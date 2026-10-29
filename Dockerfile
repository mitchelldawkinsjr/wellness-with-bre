# The live site is the new UI in new_design/. `/` is today/code.html.
# The phone remote uses the session API in server.mjs, so nginx cannot serve this alone.
FROM node:22-alpine
RUN apk add --no-cache wget
WORKDIR /app
COPY new_design /app
ENV PORT=80
EXPOSE 80
CMD ["node", "server.mjs"]
