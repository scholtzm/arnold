import Dispatcher from '../dispatcher/';
import Constants from '../constants/';

import { prefixImage } from '../util/image.js';

import { setMovies, getMoviesError } from '../actions/movie-actions.js';
import { setTvShows, getTvShowsError } from '../actions/tvshow-actions.js';
import { setSeasons } from '../actions/season-actions.js';
import { setEpisodes } from '../actions/episode-actions.js';
import videoLibrary from './api/video-library.js';

import { setAlbums, getAlbumsError } from '../actions/album-actions.js';
import { setSongs } from '../actions/song-actions.js';
import audioLibrary from './api/audio-library.js';

import defaultAlbumCover from '../static/image/default-album-cover.svg';

function initVideoLibrary() {
  Dispatcher.register(function(action) {
    switch(action.type) {
      case Constants.MovieActions.GET_MOVIES:
        videoLibrary.getMovies((err, res) => {
          if (err) {
            getMoviesError(err);
            return;
          };

          let movies = res.result.movies.map(movie => {
            movie.thumbnail = prefixImage(movie.thumbnail);
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

          let tvShows = res.result.tvshows.map(tvshow => {
            tvshow.thumbnail = prefixImage(tvshow.thumbnail);
            return tvshow;
          });

          setTvShows(tvShows);
        });
        break;

      case Constants.SeasonActions.GET_SEASONS:
        videoLibrary.getSeasons(action.tvshowid, (err, res) => {
          let seasons = res.result.seasons.map(season => {
            season.thumbnail = prefixImage(season.thumbnail);
            return season;
          });

          setSeasons(seasons);
        });
        break;

      case Constants.EpisodeActions.GET_EPISODES:
        videoLibrary.getEpisodes(action.tvshowid, action.season, (err, res) => {
          let episodes = res.result.episodes.map(episode => {
            episode.thumbnail = prefixImage(episode.thumbnail);
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

          let albums = res.result.albums.map(album => {
            if(album.thumbnail === '') {
              album.thumbnail = defaultAlbumCover;
            } else {
              album.thumbnail = prefixImage(album.thumbnail);
            }

            return album;
          });

          setAlbums(albums);
        });
        break;

      case Constants.SongActions.GET_SONGS:
        audioLibrary.getSongs(action.albumid, (err, res) => {

          let songs = res.result.songs.map(song => {
            let minutes = Math.floor(song.duration / 60);
            let seconds = song.duration % 60;

            if(minutes < 10) {
              minutes = `0${minutes}`;
            }

            if(seconds < 10) {
              seconds = `0${seconds}`;
            }

            song.durationReadable = `${minutes}:${seconds}`;
            return song;
          });

          setSongs(songs);
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
