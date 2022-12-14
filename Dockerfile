FROM node:16 as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG REACT_APP_BACKEND_URL
ARG REACT_APP_SOCKET_URL
ARG REACT_APP_MAIN_SERVER_URL
ARG REACT_APP_BACKEND_URL_2

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.18.0-alpine

COPY --chown=101:0 --from=builder /app/build /var/www
COPY --from=builder /app/gitlab-ci/config/nginx/default.conf /etc/nginx/conf.d/default.conf
