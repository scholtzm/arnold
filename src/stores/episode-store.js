import { EventEmitter } from 'events';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'EpisodeStore';
const logger = debug('store:episodes');

class EpisodeStore extends EventEmitter {

  constructor() {
    super();

    this.state = {
      episodes: {}
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

  getByTvShow(tvshowid) {
    return this.state.episodes[tvshowid] || {};
  }

  getByTvShowAndSeason(tvshowid, season) {
    if(!(tvshowid in this.state.episodes)) {
      return [];
    }

    if(!(season in this.state.episodes[tvshowid])) {
      return [];
    }

    return this.state.episodes[tvshowid][season];
  }

  addEpisodes(episodes) {
    const tvshowid = episodes[0].tvshowid;
    const season = episodes[0].season;

    if(!(tvshowid in this.state.episodes)) {
      this.state.episodes[tvshowid] = {};
    }

    this.state.episodes[tvshowid][season] = episodes;

    this.emitChange();
  }

};

const episodeStore = new EpisodeStore();

EpisodeStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.EpisodeActions.SET_EPISODES:
      episodeStore.addEpisodes(action.episodes);
      break;

    default:
      // ignore
  }
});

export default episodeStore;
