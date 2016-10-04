import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function getMovies() {
  Dispatcher.dispatch({
    type: Constants.MovieActions.GET_MOVIES,
  });
}

export function setMovies(movies) {
  Dispatcher.dispatch({
    type: Constants.MovieActions.SET_MOVIES,
    movies
  });
}

export function getMoviesError(error) {
  Dispatcher.dispatch({
    type: Constants.MovieActions.GET_MOVIES_ERROR,
    error
  });
}
