import { EventEmitter } from 'events';
import assign from 'object-assign';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'TvShowStore';
const logger = debug('store:tvshows');

let state = {
  tvShows: [],
  lastFetchFailed: false
}

const oldState = storage.get(LOCAL_STORAGE_KEY);
if(oldState !== null) {
  state = oldState;
}

let TvShowStore = assign({}, EventEmitter.prototype, {

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

TvShowStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.TvShowActions.SET_TVSHOWS:
      state.lastFetchFailed = false;
      state.tvShows = action.tvShows;
      TvShowStore.emitChange();
      break;

    case Constants.TvShowActions.GET_TVSHOWS_ERROR:
      state.lastFetchFailed = true;
      TvShowStore.emitChange();
      break;

    default:
      // ignore
  }
});

export default TvShowStore;
