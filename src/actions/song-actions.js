import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function getSongs(albumid) {
  Dispatcher.dispatch({
    type: Constants.SongActions.GET_SONGS,
    albumid
  });
}

export function setSongs(songs) {
  Dispatcher.dispatch({
    type: Constants.SongActions.SET_SONGS,
    songs
  });
}
