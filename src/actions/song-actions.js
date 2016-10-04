import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function getSongs() {
  Dispatcher.dispatch({
    type: Constants.SongActions.GET_SONGS,
  });
}

export function setSongs(songs) {
  Dispatcher.dispatch({
    type: Constants.SongActions.SET_SONGS,
    songs
  });
}
