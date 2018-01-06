FROM node:9.3-alpine
COPY ./build/ /var/www/api/


WORKDIR /var/www/api/
RUN npm install

EXPOSE 3001

ENTRYPOINT ["./bin/www"]

