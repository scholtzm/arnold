# Arnold [![Build Status](https://travis-ci.org/scholtzm/arnold.svg?branch=master)](https://travis-ci.org/scholtzm/arnold) [![codecov](https://codecov.io/gh/scholtzm/arnold/branch/master/graph/badge.svg)](https://codecov.io/gh/scholtzm/arnold)

> 🎬 A modern Kodi web interface

Arnold is a modern Kodi web interface which aims to provide relevant information and functionality in a sleek and intuitive design.

Written in JavaScript using [React](https://facebook.github.io/react/), [Flux](https://facebook.github.io/flux/) and [Semantic-UI-React](http://react.semantic-ui.com/) and all put together with [create-react-app](https://github.com/facebookincubator/create-react-app).

## Features

* Remotely control Kodi.
* Browse your movies, TV shows and music.
* Search your entire library through a single search bar.
* Track your progress and hide seen movies and episodes.
* Automatic update notifications.
* Supports multiple transport layers - WebSocket and AJAX.

## Installation

1. Download latest zip package from [releases section](https://github.com/scholtzm/arnold/releases).
2. [Install addon from the zip file](http://kodi.wiki/view/HOW-TO:Install_add-ons_from_zip_files).
3. Navigate your browser to `http://<KODI_IP_ADDRESS>:<PORT>/addons/webinterface.ARNOLD`, e.g. `http://192.168.100.2:8080/addons/webinterface.ARNOLD/`
4. Optional: [Set Arnold as your default web interface](http://kodi.wiki/view/web_interface#Default_web_interface).

## Developers

1. Clone this repo.
2. Run `npm i` to install all dependencies.
3. Start with `npm start` and navigate your browser to `localhost:3000`.
4. Once you are satisfied with your changes, build a zip package with `npm run make`.
5. Submit a pull request here if possible.

**Note:** You might want to use browser extension that allows you to bypass CORS headers, such as [this one](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).

## LICENSE

MIT. See `LICENSE`.
