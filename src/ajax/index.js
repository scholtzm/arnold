import Dispatcher from '../dispatcher/';
import Constants from '../constants/';
import { setMovies, getMoviesError } from '../actions/movie-actions.js';
import { setTvShows, getTvShowsError } from '../actions/tvshow-actions.js';
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
            movie.thumbnail = decodeURIComponent(movie.thumbnail.replace('image://', ''));
            movie.youtubeId = movie.trailer.replace(/^(.+?)videoid=/, '');
            return movie;
          });

          setMovies(movies);
        });
        break;

      case Constants.TvShowActions.GET_TVSHOWS:
        videoLibrary.getTvShows((err, res) => {
          if (err) {
            getTvShowsError(err);
            return;
          };

          let tvShows = res.body.result.tvshows.map(tvshow => {
            const decoded = decodeURIComponent(tvshow.thumbnail.replace('image://', ''));
            tvshow.thumbnail = decoded.substring(0, decoded.length - 1);
            return tvshow;
          });

          setTvShows(tvShows);
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
