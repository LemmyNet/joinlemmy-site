# JoinLemmy-site

## Local Development

- Install [pnpm](https://pnpm.io/installation)
- Get the code with `git clone https://github.com/LemmyNet/joinlemmy-site.git --recursive` (the recursive part is important to fetch git submodules)
- Run `pnpm install`, then `pnpm start`
- Open `http://localhost:1234/` in the browser

## Docker Development

- Install Docker
- Get the code with `git clone https://github.com/LemmyNet/joinlemmy-site.git --recursive` (the recursive part is important to fetch git submodules)
- Build the image with `docker build . -t joinlemmy-site`
- Start it with `docker run -p 1234:1234 joinlemmy-site`
- Open `http://localhost:1234/` in the browser
