<h1 align="center">
  <br>
  <img src="docs/images/logo.svg" alt="A Szomszéd Zöldséges logó" width="150">
  <br>
  A Szomszéd Zöldséges
  <br>
</h1>

<h4 align="center">A vulnerable webapp for demonstration purposes, built with <a href="https://svelte.dev/" target="_blank">Svelte</a>.</h4>

<p align="center">
    <img
		src="https://img.shields.io/github/created-at/bauerbrun0/szomszed-zoldseges"
    >
	<img
		src="https://img.shields.io/github/commit-activity/y/bauerbrun0/szomszed-zoldseges"
    >
	<img
		src="https://img.shields.io/github/languages/top/bauerbrun0/szomszed-zoldseges"
    >
	<img
		src="https://img.shields.io/github/v/release/bauerbrun0/szomszed-zoldseges"
	>

</p>

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
pnpm run data:mkdir
pnpm run db:push
pnpm run check
pnpm run db:init-data
pnpm run dev
```

## Building

#### Puppeteer dependencies
See: https://github.com/puppeteer/puppeteer/issues/5662#issuecomment-732076246

```bash
apt update
apt install -y gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
apt install -y libgbm-dev
```

```bash
pnpm run data:mkdir
pnpm run db:push
pnpm run check
pnpm run build
pnpm run db:init-data
pnpm start
```

