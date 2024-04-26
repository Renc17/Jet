FROM node:iron-alpine as base
COPY . /app
WORKDIR /app
RUN yarn && yarn build
RUN rm -rf node_modules

FROM node:iron-alpine as production

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
USER nonroot

WORKDIR /app
# COPY --from=base /app/ .
COPY --from=base /app/package*.json ./
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
ENV NODE_ENV=production
# RUN yarn install --production --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache

EXPOSE 3000

CMD ["yarn", "start"]
