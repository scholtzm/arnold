import { EventEmitter } from 'events';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'TvShowStore';
const logger = debug('store:tvshows');

class TvShowStore extends EventEmitter {

  constructor() {
    super();

    this.state = {
      tvShows: [],
      lastFetchFailed: false
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

  setTvShows(tvShows) {
    this.state.lastFetchFailed = false;
    this.state.tvShows = tvShows;

    this.persist();
    this.emitChange();
  }

  setLastFetchFailed(value) {
    this.state.lastFetchFailed = value;
    this.emitChange();
  }

};

const tvShowStore = new TvShowStore();

TvShowStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.TvShowActions.SET_TVSHOWS:
      tvShowStore.setTvShows(action.tvShows);
      break;

    case Constants.TvShowActions.GET_TVSHOWS_ERROR:
      tvShowStore.setLastFetchFailed(true);
      break;

    default:
      // ignore
  }
});

export default tvShowStore;
