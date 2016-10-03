import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function getSeasons(tvshowid) {
  Dispatcher.dispatch({
    type: Constants.SeasonActions.GET_SEASONS,
    tvshowid
  });
}

export function setSeasons(seasons) {
  Dispatcher.dispatch({
    type: Constants.SeasonActions.SET_SEASONS,
    seasons
  });
}
