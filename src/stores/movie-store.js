import { EventEmitter } from 'events';
import assign from 'object-assign';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'MovieStore';
const logger = debug('store:movies');

let state = {
  movies: [],
  lastFetchFailed: false
}

const oldState = storage.get(LOCAL_STORAGE_KEY);
if(oldState !== null) {
  state = oldState;
}

let MovieStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    storage.set(LOCAL_STORAGE_KEY, state);
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    logger('addChangeListener');
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    logger('removeChangeListener');
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return state;
  }

});

MovieStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.MovieActions.SET_MOVIES:
      state.lastFetchFailed = false;
      state.movies = action.movies;
      MovieStore.emitChange();
      break;

    case Constants.MovieActions.GET_MOVIES_ERROR:
      state.lastFetchFailed = true;
      MovieStore.emitChange();
      break;

    default:
      // ignore
  }
});

export default MovieStore;
