import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';

import App from './App';
import Remote from './components/remote';
import Movies from './components/movies';
import TvShows from './components/tvshows';
import Music from './components/music';
import Settings from './components/settings';

import Notifications from './components/misc/notifications.js';
import SettingsStore from './stores/settings-store.js';

import { connect } from './ws/';
import { init as initWebSockets } from './ws/flux-listeners.js';
import { checkUpdate } from './util/updater.js';

import 'semantic-ui-css/semantic.css';

const settings = SettingsStore.get();

// Connect via websockets and init flux listeners
connect();
initWebSockets();

// Check for updates
if(settings.checkForUpdatesOnInitialLoad) {
  checkUpdate();
}

// Render
ReactDOM.render(
  <div>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Movies} />
        <Route path='remote' component={Remote} />
        <Route path='movies' component={Movies} />
        <Route path='tvshows' component={TvShows} />
        <Route path='music' component={Music} />
        <Route path='settings' component={Settings} />
      </Route>
    </Router>
    <Notifications />
  </div>,
  document.getElementById('root')
);
