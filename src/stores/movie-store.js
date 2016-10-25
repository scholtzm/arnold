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

  persist() {
    storage.set(LOCAL_STORAGE_KEY, this.state)
      .then(() => logger('Replicated to local storage'))
      .catch((err) => logger('Failed to replicate to local storage', err));
  }

  get() {
    return this.state;
  }

  setMovies(movies) {
    this.state.lastFetchFailed = false;
    this.state.movies = movies;

    this.persist();
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
