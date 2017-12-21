FROM node:9.3-alpine
COPY ./backend/ /var/www/api/

WORKDIR /var/www/api/
RUN npm install
EXPOSE 3001
RUN npm start
ENTRYPOINT ["./bin/www"]
