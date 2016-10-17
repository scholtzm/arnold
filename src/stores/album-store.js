import { EventEmitter } from 'events';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'AlbumStore';
const logger = debug('store:albums');

class AlbumStore extends EventEmitter {

  constructor() {
    super();

    this.state = {
      albums: [],
      lastFetchFailed: false
    };

    const oldState = storage.get(LOCAL_STORAGE_KEY);
    if(oldState !== null) {
      this.state = oldState;
    }
  }

  emitChange() {
    storage.set(LOCAL_STORAGE_KEY, this.state);
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

  setAlbums(albums) {
    this.state.lastFetchFailed = false;
    this.state.albums = albums;
    this.emitChange();
  }

  setLastFetchFailed(value) {
    this.state.lastFetchFailed = value;
    this.emitChange();
  }

};

const albumStore = new AlbumStore();

AlbumStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.AlbumActions.SET_ALBUMS:
      albumStore.setAlbums(action.albums);
      break;

    case Constants.AlbumActions.GET_ALBUMS_ERROR:
      albumStore.setLastFetchFailed(true);
      break;

    default:
      // ignore
  }
});

export default albumStore;
