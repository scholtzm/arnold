import { request } from './';

function getAlbums(callback) {
  const params = {
    limits: {
      start: 0
    },
    properties: [
      'description',
      'theme',
      'mood',
      'style',
      'type',
      'albumlabel',
      'artist',
      'genre',
      'rating',
      'title',
      'year',
      'thumbnail'
    ],
    sort: {
      method: 'artist'
    }
  };

  request('AudioLibrary.GetAlbums', params, callback);
}

function getSongs(albumid, callback) {
  const params = {
    filter: {
      albumid
    },
    sort: {
      method: 'track'
    },
    properties: [
      'albumid',
      'title',
      'artist',
      'genre',
      'track',
      'duration',
      'year',
      'rating',
      'playcount'
    ]
  };

  request('AudioLibrary.GetSongs', params, callback);
}

function scan(callback) {
  request('AudioLibrary.Scan', {}, callback);
}

function clean(callback) {
  request('AudioLibrary.Clean', {}, callback);
}

export default {
  getAlbums,
  getSongs,
  scan,
  clean
}
