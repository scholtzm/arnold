import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import Remote from './components/remote';
import Movies from './components/movies';
import Settings from './components/settings';
import Notifications from './components/misc/notifications.js';
import SettingsStore from './stores/settings-store.js';
import { init } from './ajax/';
import { connect } from './ws/';
import { checkUpdate } from './util/updater.js';

import 'semantic-ui-css/semantic.css';

const settings = SettingsStore.get();

const TVShows = () => (
  <div>
    tv shows
  </div>
);

const Music = () => (
  <div>
    music
  </div>
);

// Initialize AJAX data services
init();

// Connect via websockets
connect();

// Check for updates
if(settings.checkForUpdatesOnInitialState) {
  checkUpdate();
}

// Render
ReactDOM.render(
  <div>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Movies} />
        <Route path='remote' component={Remote} />
        <Route path='movies' component={Movies} />
        <Route path='tvshows' component={TVShows} />
        <Route path='music' component={Music} />
        <Route path='settings' component={Settings} />
      </Route>
    </Router>
    <Notifications />
  </div>,
  document.getElementById('root')
);
