import { EventEmitter } from 'events';
import assign from 'object-assign';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'AlbumStore';
const logger = debug('store:albums');

let state = {
  albums: [],
  lastFetchFailed: false
}

const oldState = storage.get(LOCAL_STORAGE_KEY);
if(oldState !== null) {
  state = oldState;
}

let AlbumStore = assign({}, EventEmitter.prototype, {

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

AlbumStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.AlbumActions.SET_ALBUMS:
      state.lastFetchFailed = false;
      state.albums = action.albums;
      AlbumStore.emitChange();
      break;

    case Constants.AlbumActions.GET_ALBUMS_ERROR:
      state.lastFetchFailed = true;
      AlbumStore.emitChange();
      break;

    default:
      // ignore
  }
});

export default AlbumStore;
