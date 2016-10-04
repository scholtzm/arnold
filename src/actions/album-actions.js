import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function getAlbums() {
  Dispatcher.dispatch({
    type: Constants.AlbumActions.GET_ALBUMS,
  });
}

export function setAlbums(albums) {
  Dispatcher.dispatch({
    type: Constants.AlbumActions.SET_ALBUMS,
    albums
  });
}

export function getAlbumsError(error) {
  Dispatcher.dispatch({
    type: Constants.AlbumActions.GET_ALBUMS_ERROR,
    error
  });
}
