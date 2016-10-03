import { EventEmitter } from 'events';
import assign from 'object-assign';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'SeasonStore';
const logger = debug('store:seasons');

let state = {
  seasons: {}
}

const oldState = storage.get(LOCAL_STORAGE_KEY);
if(oldState !== null) {
  state = oldState;
}

function addSeasons(seasons) {
  const tvshowid = seasons[0].tvshowid;
  state.seasons[tvshowid] = seasons;
}

let SeasonStore = assign({}, EventEmitter.prototype, {

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

  getBy: function(tvshowid) {
    return state.seasons[tvshowid] || [];
  }

});

SeasonStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.SeasonActions.SET_SEASONS:
      addSeasons(action.seasons);
      SeasonStore.emitChange();
      break;

    default:
      // ignore
  }
});

export default SeasonStore;
