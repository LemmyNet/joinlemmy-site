# [join-lemmy.org](https://join-lemmy.org/)

The official website of the Lemmy project. It is for anyone who hears about Lemmy on Reddit, in real life or elsewhere, searches for it and ends up on the site as one of the first results. It should give a quick overview and link all relevant resources. At the same time it should be easy to register an account and become an active user, with as little friction as possible.

The repo contains a couple of data files. You are encouraged to make a PR and update them:

- [/src/shared/components/app-definitions.ts](/src/shared/components/app-definitions.ts): List of available Lemmy apps with screenshots and download links.
- [/src/shared/components/instances-definitions.ts](/src/shared/components/instances-definitions.ts): Metadata for Lemmy instances (languages and topics).

## Development

Built with Typescript, TailwindCSS and InfernoJs.

### Local

- Install [pnpm](https://pnpm.io/installation)
- Get the code with `git clone https://github.com/LemmyNet/joinlemmy-site.git --recursive` (the recursive part is important to fetch git submodules)
- Run `pnpm install`, then `pnpm start`
- Open `http://localhost:1234/` in the browser

### Docker

- Install Docker
- Get the code with `git clone https://github.com/LemmyNet/joinlemmy-site.git --recursive` (the recursive part is important to fetch git submodules)
- Build the image with `docker build . -t joinlemmy-site`
- Start it with `docker run -p 1234:1234 joinlemmy-site`
- Open `http://localhost:1234/` in the browser

## License

[AGPLv3](/LICENSE)
