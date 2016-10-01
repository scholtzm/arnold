import request from './request.js';
import Dispatcher from '../dispatcher/';
import Constants from '../constants/';
import { getMoviesError, setMovies } from '../actions/movie-actions.js';

function getMovies(start = 0, end = -1) {
  const params = {
    limits: {
      start,
      // end: end
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

  request('VideoLibrary.GetMovies', params, (err, res) => {
    if (err) {
      getMoviesError(err);
      return;
    };

    let movies = res.body.result.movies.map(movie => {
      // Fix thumbnail URL
      movie.thumbnail = decodeURIComponent(movie.thumbnail.replace('image://', ''));
      movie.youtubeId = movie.trailer.replace(/^(.+?)videoid=/, '');
      return movie;
    });

    setMovies(movies);
  });
};

function scan(callback) {
  request('VideoLibrary.Scan', {}, callback);
}

function clean(callback) {
  request('VideoLibrary.Clean', {}, callback);
}

function init() {
  Dispatcher.register(function(action) {
    switch(action.type) {
      case Constants.MovieActions.GET_MOVIES:
        getMovies();
        break;

      default:
        // ignore
    }
  });
};

export default {
  init,
  scan,
  clean
}
