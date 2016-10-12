import { request } from './';

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

function getTvShows(callback) {
  const params = {
    properties: [
      'genre',
      'plot',
      'title',
      'lastplayed',
      'episode',
      'year',
      'playcount',
      'rating',
      'thumbnail',
      'studio',
      'mpaa',
      'premiered',
      'episodeguide',
      'watchedepisodes'
    ]
  };

  request('VideoLibrary.GetTVShows', params, callback);
}

function getSeasons(tvshowid, callback) {
  const params = {
    tvshowid,
    properties: [
      'season',
      'showtitle',
      'playcount',
      'episode',
      'thumbnail',
      'fanart',
      'tvshowid'
    ]
  };

  request('VideoLibrary.GetSeasons', params, callback);
}

function getEpisodes(tvshowid, season, callback) {
  const params = {
    tvshowid,
    season,
    properties: [
      'title',
      'thumbnail',
      'plot',
      'episode',
      'season',
      'tvshowid',
      'playcount'
    ]
  };

  request('VideoLibrary.GetEpisodes', params, callback);
}

function scan(callback) {
  request('VideoLibrary.Scan', {}, callback);
}

function clean(callback) {
  request('VideoLibrary.Clean', {}, callback);
}

export default {
  scan,
  clean,
  getMovies,
  getTvShows,
  getSeasons,
  getEpisodes
}
