# Arnold [![Build Status](https://travis-ci.org/scholtzm/arnold.svg?branch=master)](https://travis-ci.org/scholtzm/arnold) [![codecov](https://codecov.io/gh/scholtzm/arnold/branch/master/graph/badge.svg)](https://codecov.io/gh/scholtzm/arnold)

[![Greenkeeper badge](https://badges.greenkeeper.io/scholtzm/arnold.svg)](https://greenkeeper.io/)

> 🎬 A modern Kodi web interface

Arnold is a modern Kodi web interface which aims to provide relevant information and functionality in a sleek and intuitive design. Arnold is designed to be able to run directly as a Kodi addon, but also as a completely standalone web app.

Written in JavaScript using [React](https://facebook.github.io/react/), [Flux](https://facebook.github.io/flux/) and [Semantic-UI-React](http://react.semantic-ui.com/) and bootstrapped by [create-react-app](https://github.com/facebookincubator/create-react-app).

![Arnold Demo Library Screenshot](https://cloud.githubusercontent.com/assets/2640934/22247682/69e4962e-e23b-11e6-9c30-3a9f342ce9d0.png)

## Demo

Check out the [demo](https://scholtzm.github.io/arnold/) to see how Arnold works.

## Features

* Remotely control Kodi.
* Browse your movies, TV shows and music.
* Search your entire library through a single search bar.
* Track your progress and hide seen movies and episodes.
* Receive automatic update notifications.
* Choose between multiple transport layers - WebSocket and AJAX.
* Access your library even if your Kodi is offline thanks to client-side caching.
* Works as a Kodi addon but also as a standalone web app.

## Installation

*__Served by Kodi__*

This is the most common way to install Kodi web interface - simply let Kodi serve all the files on your local network.

1. Download latest zip package from [releases section](https://github.com/scholtzm/arnold/releases).
2. [Install addon from the zip file](http://kodi.wiki/view/HOW-TO:Install_add-ons_from_zip_files).
3. Navigate your browser to `http://<KODI_IP_ADDRESS>:<PORT>/addons/webinterface.ARNOLD`, e.g. `http://192.168.1.1:8080/addons/webinterface.ARNOLD/`
4. Optional: [Set Arnold as your default web interface](http://kodi.wiki/view/web_interface#Default_web_interface).

*__Running Arnold on a separate server__*

Arnold can run standalone on any machine on your local network and can connect to Kodi via WebSockets. These instructions are for advanced users.

1. Download latest zip package from [releases section](https://github.com/scholtzm/arnold/releases).
2. Unzip the file.
3. Serve the contents of `webinterface.ARNOLD` folder with an HTTP server.
4. Do not forget to set the IP address and transport layer in the settings.

## Development

1. Clone this repo.
2. Run `npm i` to install all dependencies.
3. Create custom Semantic-UI stylesheet by running `npm run customize-semantic`.
4. Start with `npm start` and navigate your browser to `localhost:3000`.
5. Once you are satisfied with your changes, build a zip package with `npm run make`.
6. Submit a pull request here if possible.

**Note:** Depending on how your Kodi is setup, when using AJAX transport layer, you might want to use browser extension that allows you to bypass CORS headers, such as [this one](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).

#### Debugger

This project uses [debug](https://www.npmjs.com/package/debug) module for debugging. You can turn debugging on and off via the `localStorage.debug` value in your browser.

The most important values are:

```js
localStorage.debug = 'arnold:*' // debug everything
localStorage.debug = null       // turn debug off
```

Once you change the flag, you need to refresh your browser to see the changes in debug output.

## LICENSE

MIT. See `LICENSE`.
