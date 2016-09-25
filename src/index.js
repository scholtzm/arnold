import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import Movies from './components/movies';
import Settings from './components/settings';
import { init } from './ajax/';
import { connect } from './ws/';

import 'semantic-ui-css/semantic.css';

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

const Remote = () => (
  <div>
    remote
  </div>
);

// Initialize AJAX data services
init();

// Connect via websockets
connect();

// Render
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Movies} />
      <Route path='remote' component={Remote} />
      <Route path='movies' component={Movies} />
      <Route path='tvshows' component={TVShows} />
      <Route path='music' component={Music} />
      <Route path='settings' component={Settings} />
    </Route>
  </Router>,
  document.getElementById('root')
);
