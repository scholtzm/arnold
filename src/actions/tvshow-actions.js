import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function getTvShows() {
  Dispatcher.dispatch({
    type: Constants.TvShowActions.GET_TVSHOWS,
  });
}

export function setTvShows(tvShows) {
  Dispatcher.dispatch({
    type: Constants.TvShowActions.SET_TVSHOWS,
    tvShows
  });
}

export function getTvShowsError(error) {
  Dispatcher.dispatch({
    type: Constants.TvShowActions.GET_TVSHOWS_ERROR,
    error
  })
}
