import { EventEmitter } from 'events';
import assign from 'object-assign';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'SongStore';
const logger = debug('store:songs');

let state = {
  songs: {}
}

const oldState = storage.get(LOCAL_STORAGE_KEY);
if(oldState !== null) {
  state = oldState;
}

function addSongs(songs) {
  const albumid = songs[0].albumid;
  state.songs[albumid] = songs;
}

let SongStore = assign({}, EventEmitter.prototype, {

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
  },

  getBy: function(albumid) {
    return state.songs[albumid] || [];
  }

});

SongStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.SongActions.SET_SONGS:
      addSongs(action.songs);
      SongStore.emitChange();
      break;

    default:
      // ignore
  }
});

export default SongStore;
