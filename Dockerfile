# Build the git includes for the docs
FROM alpine:3 as docs_include
RUN apk add --no-cache git bash curl
WORKDIR /app
COPY lemmy-docs ./lemmy-docs
WORKDIR /app/lemmy-docs
RUN ./update-includes.sh

# Build the docs
FROM alpine:3 as docs
WORKDIR /app
RUN wget -O mdbook.tar.gz https://github.com/rust-lang/mdBook/releases/download/v0.4.30/mdbook-v0.4.30-x86_64-unknown-linux-musl.tar.gz
RUN tar -xzf mdbook.tar.gz
COPY lemmy-docs ./lemmy-docs
RUN ./mdbook build lemmy-docs -d ../docs

# Build the typedoc API docs
FROM node:alpine as api
WORKDIR /app
COPY lemmy-js-client lemmy-js-client
WORKDIR /app/lemmy-js-client
RUN yarn
RUN yarn docs

# Build the isomorphic app
FROM node:alpine as builder
RUN apk update && apk add yarn python3 build-base gcc wget git curl --no-cache
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

WORKDIR /app

# Cache deps
COPY package.json yarn.lock ./
RUN yarn --production --prefer-offline --pure-lockfile

# Build
COPY tsconfig.json \
  webpack.config.js \
  .babelrc \
  generate_translations.mjs \
  generate_rss_feed.mjs \
  tailwind.config.js \
  ./

COPY joinlemmy-translations joinlemmy-translations
COPY lemmy-translations lemmy-translations
COPY src src

# Copy the docs and API
COPY --from=docs /app/docs ./src/assets/docs
COPY --from=api /app/lemmy-js-client/docs ./src/assets/api

RUN yarn --production --prefer-offline
RUN yarn build:prod

# Prune the image
RUN node-prune ./node_modules

RUN rm -rf ./node_modules/import-sort-parser-typescript
RUN rm -rf ./node_modules/typescript
RUN rm -rf ./node_modules/npm

RUN du -sh ./node_modules/* | sort -nr | grep '\dM.*'

FROM node:alpine as runner
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 1234
WORKDIR /app
CMD node dist/js/server.js
