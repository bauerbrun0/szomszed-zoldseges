![Logo](docs/images/logo.png)
> A vulnerable webapp for demonstration purposes, built with Svelte. 

![Github Created At](https://img.shields.io/github/created-at/bauerbrun0/szomszed-zoldseges) ![GitHub commit activity](https://img.shields.io/github/commit-activity/y/bauerbrun0/szomszed-zoldseges) ![GitHub top language](https://img.shields.io/github/languages/top/bauerbrun0/szomszed-zoldseges)

![Home page screenshot](docs/images/home-page.png)
## Pre-requisites

```bash
pnpm install
cp .env.example .env
cp .env.example .env.production
# Edit .env and .env.production
```

## Development

```bash
pnpm run dev
```

## Building

```bash
pnpm run data:mkdir
pnpm run db:push
pnpm run check
pnpm run build
pnpm run db:init-data
pnpm start
```