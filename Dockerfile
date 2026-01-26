# Build the git includes for the docs
FROM debian:stable-slim AS docs_include
RUN apt-get update && apt-get install -y git bash curl \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY lemmy-docs ./lemmy-docs
WORKDIR /app/lemmy-docs
RUN ./update-includes.sh

# Build the docs
FROM node:current-slim AS docs
WORKDIR /app
RUN apt-get update && apt-get install -y wget \
 && rm -rf /var/lib/apt/lists/*
RUN wget -O mdbook.tar.gz https://github.com/rust-lang/mdBook/releases/download/v0.5.2/mdbook-v0.5.2-x86_64-unknown-linux-gnu.tar.gz
RUN tar -xzf mdbook.tar.gz
COPY lemmy-docs ./lemmy-docs
RUN ./mdbook build lemmy-docs -d docs
RUN ls -lah /app/docs/

# Build the typedoc lemmy-js-client docs, and swagger.json
FROM node:current-slim AS api_v0.19
WORKDIR /app
COPY lemmy-js-client-v0.19 lemmy-js-client
WORKDIR /app/lemmy-js-client
RUN npm install -g -f corepack && corepack enable pnpm
RUN pnpm i
RUN pnpm run docs
# OpenAPI isn't currently working for the v0.19 docs, so no pnpm tsoa

# Do the same for the api docs, but on main
FROM node:current-slim AS api_main
WORKDIR /app
COPY lemmy-js-client-main lemmy-js-client
WORKDIR /app/lemmy-js-client
RUN npm install -g -f corepack && corepack enable pnpm
RUN pnpm i -f
RUN pnpm run docs
RUN pnpm tsoa

# Build the isomorphic app
FROM node:current-slim AS builder
RUN apt-get update && apt-get install -y curl \
 && rm -rf /var/lib/apt/lists/*
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN npm install -g -f corepack && corepack enable pnpm

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
  ./

COPY joinlemmy-translations joinlemmy-translations
COPY lemmy-translations lemmy-translations
COPY src src

# Copy the rust docs, lemmy-js-client docs, and OpenAPI docs.
COPY --from=docs /app/docs ./src/assets/docs
COPY --from=api_v0.19 /app/lemmy-js-client/docs ./src/assets/lemmy-js-client-v0.19-docs
COPY --from=api_main /app/lemmy-js-client/docs ./src/assets/lemmy-js-client-main-docs
COPY --from=api_main /app/lemmy-js-client/redoc-static.html ./src/assets/api_main.html

RUN pnpm i
RUN pnpm prebuild:prod
RUN pnpm build:prod

# Prune the image
RUN node-prune ./node_modules

RUN rm -rf ./node_modules/import-sort-parser-typescript
RUN rm -rf ./node_modules/typescript
RUN rm -rf ./node_modules/npm

FROM node:current-slim  AS runner
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 1234
WORKDIR /app
CMD node dist/js/server.js
