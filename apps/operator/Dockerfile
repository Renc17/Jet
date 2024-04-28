FROM node:iron-alpine
WORKDIR /app
COPY . .
RUN yarn install --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache && yarn build

EXPOSE 3030

CMD ["yarn", "start"]
