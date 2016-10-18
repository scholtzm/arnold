import { EventEmitter } from 'events';

import debug from '../util/debug.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'MovieStore';
const logger = debug('store:movies');

class MovieStore extends EventEmitter {

  constructor() {
    super();

    this.state = {
      movies: [],
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

  setMovies(movies) {
    this.state.lastFetchFailed = false;
    this.state.movies = movies;
    this.emitChange();
  }

  setLastFetchFailed(value) {
    this.state.lastFetchFailed = value;
    this.emitChange();
  }

};

const movieStore = new MovieStore();

MovieStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.MovieActions.SET_MOVIES:
      movieStore.setMovies(action.movies);
      break;

    case Constants.MovieActions.GET_MOVIES_ERROR:
      movieStore.setLastFetchFailed(true);
      break;

    default:
      // ignore
  }
});

export default movieStore;
