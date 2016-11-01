import cloneDeep from 'lodash/cloneDeep';
import debug from '../../util/debug.js';

import MovieStoreData from '../../../data/MovieStoreData.json';
import AlbumStoreData from '../../../data/AlbumStoreData.json';
import SongStoreData from '../../../data/SongStoreData.json';

const logger = debug('mock:request');
const RESPONSE_DELAY = 500;

function getDataForMethodAndParams(method, params) {
  switch(method) {
    case 'VideoLibrary.GetMovies':
      return cloneDeep(MovieStoreData);
    case 'AudioLibrary.GetAlbums':
      return cloneDeep(AlbumStoreData);
    case 'AudioLibrary.GetSongs':
      return cloneDeep(SongStoreData[params.filter.albumid]);
    default:
      return {result: {}};
  }
}

export function request(method, params, callback) {
  logger('Received request', method, params);

  const data = getDataForMethodAndParams(method, params);

  setTimeout(() => {
    callback(null, data);
  }, RESPONSE_DELAY);
};
