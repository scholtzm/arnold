import React, { Component } from 'react';
import { Menu, Search, Label } from 'semantic-ui-react';
import { Link } from 'react-router';
import MovieStore from './stores/movie-store.js';
import TvShowStore from './stores/tvshow-store.js';
import AlbumStore from './stores/album-store.js';

import packageJson from '../package.json';
import icon from './static/image/icon-rounded.png';

const { version, repository } = packageJson;
const releaseUrl = `${repository.url}/releases/tag/v${version}`;

class App extends Component {
  constructor(...args) {
    super(...args);

    const pathname = this.props.location.pathname.replace('/', '');
    const activeItem = pathname === ''
      ? 'movies'
      : pathname;

    this.state = {
      activeItem,
      searchTerm: '',
      results: []
    };
  }

  onItemClick = (e, { name }) => this.setState({ activeItem: name })

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

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu>
          <Menu.Item>
            <img src={icon} alt='Arnold' />
            <Label as='a' href={releaseUrl} target='_blank' content={`v${version}`} color='green' />
          </Menu.Item>
          <Menu.Item as={Link} to='remote' name='remote' content='Remote' active={activeItem === 'remote'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='movies' name='movies' content='Movies' active={activeItem === 'movies'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='tvshows' name='tvshows' content='TV Shows' active={activeItem === 'tvshows'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='music' name='music' content='Music' active={activeItem === 'music'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='settings' name='settings' content='Settings' active={activeItem === 'settings'} onClick={this.onItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Search
                category
                aligned='right'
                placeholder='Search...'
                onChange={this.onChange}
                onSearchChange={this.onSearchChange}
                results={this.state.results}
                value={this.state.searchTerm}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {this.props.children}
      </div>
    );
  }
}

export default App;
