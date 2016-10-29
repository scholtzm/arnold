import cloneDeep from 'lodash/cloneDeep';
import debug from '../../util/debug.js';

import AlbumStoreData from './data/AlbumStoreData.js';
import SongStoreData from './data/SongStoreData.js';

const logger = debug('mock:request');
const RESPONSE_DELAY = 500;

function getDataForMethodAndParams(method, params) {
  switch(method) {
    case 'AudioLibrary.GetAlbums':
      return cloneDeep(AlbumStoreData);
    case 'AudioLibrary.GetSongs':
      return cloneDeep(SongStoreData[params.filter.albumid]);
    default:
      return {};
  }
}

export function request(method, params, callback) {
  logger('Received request', method, params);

  const data = getDataForMethodAndParams(method, params);

  setTimeout(() => {
    callback(null, data);
  }, RESPONSE_DELAY);
};
