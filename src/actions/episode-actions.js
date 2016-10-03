import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function getEpisodes(tvshowid, season) {
  Dispatcher.dispatch({
    type: Constants.EpisodeActions.GET_EPISODES,
    tvshowid,
    season
  });
}

export function setEpisodes(episodes) {
  Dispatcher.dispatch({
    type: Constants.EpisodeActions.SET_EPISODES,
    episodes
  });
}
