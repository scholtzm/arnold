import { EventEmitter } from 'events';
import assign from 'object-assign';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'EpisodeStore';
const logger = debug('store:episodes');

let state = {
  episodes: {}
}

const oldState = storage.get(LOCAL_STORAGE_KEY);
if(oldState !== null) {
  state = oldState;
}

function addEpisodes(episodes) {
  const tvshowid = episodes[0].tvshowid;
  const season = episodes[0].season;

  if(!(tvshowid in state.episodes)) {
    state.episodes[tvshowid] = {};
  }

  state.episodes[tvshowid][season] = episodes;
}

let EpisodeStore = assign({}, EventEmitter.prototype, {

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

  getBy: function(tvshowid, season) {
    if(!(tvshowid in state.episodes)) {
      return [];
    }

    if(!(season in state.episodes[tvshowid])) {
      return [];
    }

    return state.episodes[tvshowid][season];
  }

});

EpisodeStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.EpisodeActions.SET_EPISODES:
      addEpisodes(action.episodes);
      EpisodeStore.emitChange();
      break;

    default:
      // ignore
  }
});

export default EpisodeStore;
