FROM nginx:1.15-alpine
COPY html /root/test-docker/html
WORKDIR /root/test-docker/html
