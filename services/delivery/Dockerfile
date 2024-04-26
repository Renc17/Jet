FROM node:iron-alpine

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
USER nonroot

WORKDIR /app
COPY --chown=nonroot:nonroot . .
WORKDIR /app
RUN yarn install --pure-lockfile --non-interactive && yarn build

ENV NODE_ENV="production"

EXPOSE 3030

CMD ["yarn", "start"]
