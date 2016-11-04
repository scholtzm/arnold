import { EventEmitter } from 'events';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'SongStore';
const logger = debug('store:songs');

class SongStore extends EventEmitter {

  constructor() {
    super();

    this.state = {
      songs: {}
    };

    storage.get(LOCAL_STORAGE_KEY)
      .then(oldState => {
        if(oldState !== null) {
          this.state = oldState;
          this.emitChange();
        }
      });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    logger('addChangeListener');
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    logger('removeChangeListener');
    this.removeListener(CHANGE_EVENT, callback);
  }

  get() {
    return this.state;
  }

  persist() {
    storage.set(LOCAL_STORAGE_KEY, this.state)
      .then(() => logger('Replicated to local storage'))
      .catch((err) => logger('Failed to replicate to local storage', err));
  }

  getBy(albumid) {
    return this.state.songs[albumid] || [];
  }

  addSongs(songs) {
    const albumid = songs[0].albumid;
    this.state.songs[albumid] = songs;

    this.persist();
    this.emitChange();
  }

};

const songStore = new SongStore();

SongStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.SongActions.SET_SONGS:
      songStore.addSongs(action.songs);
      break;
  }
});

export default songStore;
