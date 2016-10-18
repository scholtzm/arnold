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

  getBy(tvshowid) {
    return this.state.seasons[tvshowid] || [];
  }

  addSeasons(seasons) {
    const tvshowid = seasons[0].tvshowid;
    this.state.seasons[tvshowid] = seasons;
    this.emitChange();
  }

};

const seasonStore = new SeasonStore();

SeasonStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.SeasonActions.SET_SEASONS:
      seasonStore.addSeasons(action.seasons);
      break;

    default:
      // ignore
  }
});

export default seasonStore;
