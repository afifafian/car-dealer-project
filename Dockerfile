FROM node:12.0-alpine

WORKDIR  /usr/src/app


# RUN apk add --no-cache tini

COPY package*.json ./

RUN npm config set package-lock false

# RUN chown -R node:node .

RUN npm install && npm cache clean --force

COPY . .

# ENTRYPOINT [ "/sbin/tini", "--" ]

EXPOSE 3005
CMD ["npm", "run", "start"]