FROM node:12.3.0-alpine
RUN mkdir -p /exchange
ADD . /exchange

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /exchange

USER node

RUN ls -la

RUN npm i -g @nestjs/cli

# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
EXPOSE 8000

CMD [ "npm", "start" ]
