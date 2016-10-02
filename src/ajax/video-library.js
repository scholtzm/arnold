import request from './request.js';

function getMovies(callback) {
  const params = {
    limits: {
      start: 0,
    },
    properties: [
      'genre',
      'director',
      'trailer',
      'tagline',
      'plot',
      'plotoutline',
      'title',
      'originaltitle',
      'lastplayed',
      'runtime',
      'year',
      'playcount',
      'rating',
      'thumbnail',
      'file'
    ],
    sort: {
      method: 'sorttitle',
      ignorearticle: true
    }
  };

  request('VideoLibrary.GetMovies', params, callback);
};

function scan(callback) {
  request('VideoLibrary.Scan', {}, callback);
}

function clean(callback) {
  request('VideoLibrary.Clean', {}, callback);
}

export default {
  scan,
  clean,
  getMovies
}
