import Dispatcher from '../dispatcher/';
import Constants from '../constants/';
import { setMovies, getMoviesError } from '../actions/movie-actions.js';
import videoLibrary from './video-library.js';

function initVideoLibrary() {
  Dispatcher.register(function(action) {
    switch(action.type) {
      case Constants.MovieActions.GET_MOVIES:
        videoLibrary.getMovies((err, res) => {
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
        break;

      default:
        // ignore
    }
  });
}

export function init() {
  initVideoLibrary();
}
