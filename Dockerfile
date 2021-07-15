FROM node:12.0-alpine

WORKDIR  /usr/src/app

ENV PORT=3005
ENV JWT_KEY=secretkey
ENV JWT_TOKENLIFE=1h
ENV DB_PORT=5432
ENV DB_NAME=backend-test
ENV DB_USER=postgres
ENV DB_PWD=postgres
ENV DB_HOST=localhost

# RUN apk add --no-cache tini

COPY package*.json ./

RUN npm config set package-lock false

# RUN chown -R node:node .

RUN npm install && npm cache clean --force

COPY . .

# ENTRYPOINT [ "/sbin/tini", "--" ]

EXPOSE 3005
CMD ["npm", "run", "start"]