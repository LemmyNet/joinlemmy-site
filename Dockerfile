# Build the git includes for the docs
FROM alpine:3 AS docs_include
RUN apk add --no-cache git bash curl
WORKDIR /app
COPY lemmy-docs ./lemmy-docs
WORKDIR /app/lemmy-docs
RUN ./update-includes.sh

# Build the docs
FROM alpine:3 AS docs
WORKDIR /app
RUN wget -O mdbook.tar.gz https://github.com/rust-lang/mdBook/releases/download/v0.4.30/mdbook-v0.4.30-x86_64-unknown-linux-musl.tar.gz
RUN tar -xzf mdbook.tar.gz
COPY lemmy-docs ./lemmy-docs
RUN ./mdbook build lemmy-docs -d ../docs

# Build the typedoc lemmy-js-client docs, and swagger.json
FROM node:20-alpine AS api
WORKDIR /app
COPY lemmy-js-client lemmy-js-client
WORKDIR /app/lemmy-js-client
RUN corepack enable pnpm
RUN pnpm i
RUN pnpm run docs
RUN pnpm tsoa

# Build the isomorphic app
FROM node:20-alpine AS builder
RUN apk update && apk add python3 build-base gcc wget git curl --no-cache
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN corepack enable pnpm

WORKDIR /app

# Cache deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm i

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

# Copy the rust docs, lemmy-js-client docs, and OpenAPI docs.
COPY --from=docs /app/docs ./src/assets/docs
COPY --from=api /app/lemmy-js-client/docs ./src/assets/lemmy-js-client-docs
COPY --from=api /app/lemmy-js-client/redoc-static.html ./src/assets/api.html

RUN pnpm i
RUN pnpm prebuild:prod
RUN pnpm build:prod

# Prune the image
RUN node-prune ./node_modules

RUN rm -rf ./node_modules/import-sort-parser-typescript
RUN rm -rf ./node_modules/typescript
RUN rm -rf ./node_modules/npm

FROM node:20-alpine AS runner
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 1234
WORKDIR /app
CMD node dist/js/server.js
