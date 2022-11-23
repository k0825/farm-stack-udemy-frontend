FROM node:18.12.1-alpine
RUN apk update && apk add git
WORKDIR /workspace
