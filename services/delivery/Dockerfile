FROM node:iron-alpine

COPY . ./app
WORKDIR /app
RUN yarn install --pure-lockfile && yarn build 

RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
RUN chown -R nonroot:nonroot /app
USER nonroot

ENV NODE_ENV="production"
ENV MONGO_CONNECTION_STRING=

EXPOSE 3030

CMD ["yarn", "start"]
