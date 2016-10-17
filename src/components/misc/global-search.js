import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

import MovieStore from '../../stores/movie-store.js';
import TvShowStore from '../../stores/tvshow-store.js';
import AlbumStore from '../../stores/album-store.js';

class GlobalSearch extends Component {
  state = {
    searchTerm: '',
    results: []
  };

  onChange = (e, result) => this.setState({ searchTerm: result.title })

  onSearchChange = (e, value) => {
    this.setState({ searchTerm: value });

    const movies = MovieStore.get().movies;
    const tvShows = TvShowStore.get().tvShows;
    const albums = AlbumStore.get().albums;

    const emptyResult = [{ title: 'No results.' }];

    let results = {
      movies: { name: 'Movies', results: emptyResult },
      tvShows: { name: 'TV Shows', results: emptyResult },
      albums: { name: 'Albums', results: emptyResult }
    };

    const matchingMovies = movies
      .filter(movie => movie.originaltitle.toLowerCase().includes(value.toLowerCase()))
      .map(movie => {
        return {
          title: movie.originaltitle,
          description: movie.year.toString(),
          image: movie.thumbnail,
        }
      });

    const matchingTvShows = tvShows
      .filter(tvShow => tvShow.title.toLowerCase().includes(value.toLowerCase()))
      .map(tvShow => {
        return {
          title: tvShow.title,
          description: tvShow.year.toString(),
          image: tvShow.thumbnail,
        }
      });

    const matchingAlbums = albums
      .filter(album => album.label.toLowerCase().includes(value.toLowerCase()))
      .map(album => {
        return {
          title: album.label,
          description: album.year.toString(),
          image: album.thumbnail,
        }
      });

    if(matchingMovies.length > 0) {
      results.movies.results = matchingMovies;
    }

    if(matchingTvShows.length > 0) {
      results.tvShows.results = matchingTvShows;
    }

    if(matchingAlbums.length > 0) {
      results.albums.results = matchingAlbums;
    }

    if(movies.length === 0) {
      results.movies.results = [
        {
          title: 'You have no movies in your library or Arnold\'s movie catalogue has not been populated yet.'
        }
      ];
    }

    if(tvShows.length === 0) {
      results.tvShows.results = [
        {
          title: 'You have no TV shows in your library or Arnold\'s TV show catalogue has not been populated yet.'
        }
      ];
    }

    if(albums.length === 0) {
      results.albums.results = [
        {
          title: 'You have no albums in your library or Arnold\'s album catalogue has not been populated yet.'
        }
      ];
    }

    this.setState({ results });
  }

  render = () => {
    return (
      <Search
        category
        aligned='right'
        placeholder='Search...'
        onChange={this.onChange}
        onSearchChange={this.onSearchChange}
        results={this.state.results}
        value={this.state.searchTerm}
      />
    );
  }

}

export default GlobalSearch;
