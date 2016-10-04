import Dispatcher from '../dispatcher/';
import Constants from '../constants/';

import { setMovies, getMoviesError } from '../actions/movie-actions.js';
import { setTvShows, getTvShowsError } from '../actions/tvshow-actions.js';
import { setSeasons } from '../actions/season-actions.js';
import { setEpisodes } from '../actions/episode-actions.js';
import videoLibrary from './video-library.js';

import { setAlbums, getAlbumsError } from '../actions/album-actions.js';
import { setSongs } from '../actions/song-actions.js';
import audioLibrary from './audio-library.js';

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

      case Constants.SeasonActions.GET_SEASONS:
        videoLibrary.getSeasons(action.tvshowid, (err, res) => {
          let seasons = res.body.result.seasons.map(season => {
            const decoded = decodeURIComponent(season.thumbnail.replace('image://', ''));
            season.thumbnail = decoded.substring(0, decoded.length - 1);
            return season;
          });

          setSeasons(seasons);
        });
        break;

      case Constants.EpisodeActions.GET_EPISODES:
        videoLibrary.getEpisodes(action.tvshowid, action.season, (err, res) => {
          let episodes = res.body.result.episodes.map(episode => {
            const decoded = decodeURIComponent(episode.thumbnail.replace('image://', ''));
            episode.thumbnail = decoded.substring(0, decoded.length - 1);
            return episode;
          });

          setEpisodes(episodes);
        });
        break;

      default:
        // ignore
    }
  });
}

function initAudioLibrary() {
  Dispatcher.register(function(action) {
    switch(action.type) {
      case Constants.AlbumActions.GET_ALBUMS:
        audioLibrary.getAlbums((err, res) => {
          if (err) {
            getAlbumsError(err);
            return;
          };

          let albums = res.body.result.albums.map(album => {
            album.thumbnail = decodeURIComponent(album.thumbnail.replace('image://', ''));
            return album;
          });

          setAlbums(albums);
        });
        break;

      case Constants.SongActions.GET_SONGS:
        videoLibrary.getSongs(action.albumid, (err, res) => {
          setSongs(res.body.result.songs);
        });
        break;

      default:
        // ignore
    }
  });
}

export function init() {
  initVideoLibrary();
  initAudioLibrary();
}
