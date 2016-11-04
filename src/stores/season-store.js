import { EventEmitter } from 'events';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'SeasonStore';
const logger = debug('store:seasons');

class SeasonStore extends EventEmitter {

  constructor() {
    super();

    this.state = {
      seasons: {}
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

  getBy(tvshowid) {
    return this.state.seasons[tvshowid] || [];
  }

  addSeasons(seasons) {
    const tvshowid = seasons[0].tvshowid;
    this.state.seasons[tvshowid] = seasons;

    this.persist();
    this.emitChange();
  }

};

const seasonStore = new SeasonStore();

SeasonStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.SeasonActions.SET_SEASONS:
      seasonStore.addSeasons(action.seasons);
      break;
  }
});

export default seasonStore;
