import React, { Component } from 'react';
import { Menu, Search } from 'stardust';
import { Link } from 'react-router';
import MovieStore from './stores/movie-store.js';
import TvShowStore from './stores/tvshow-store.js';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeItem: this.props.location.pathname,
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

    let results = {};

    if(matchingMovies.length > 0) {
      results['movies'] = {
        name: 'Movies',
        results: matchingMovies
      };
    }

    if(matchingTvShows.length > 0) {
      results['tvShows'] = {
        name: 'TV Shows',
        results: matchingTvShows
      };
    }

    if(movies.length === 0) {
      results.movies.results = [
        {
          title: 'Info',
          description: 'You have no movies in your library or Arnold\'s movie catalogue has not been populated yet.'
        }
      ];
    }

    if(tvShows.length === 0) {
      results.tvShows.results = [
        {
          title: 'Info',
          description: 'You have no TV shows in your library or Arnold\'s TV show catalogue has not been populated yet.'
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
          <Menu.Item as={Link} to='/remote' name='/remote' content='Remote' active={activeItem === '/remote'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='/movies' name='/movies' content='Movies' active={activeItem === '/movies'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='/tvshows' name='/tvshows' content='TV Shows' active={activeItem === '/tvshows'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='/music' name='/music' content='Music' active={activeItem === '/music'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='/settings' name='/settings' content='Settings' active={activeItem === '/settings'} onClick={this.onItemClick} />
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
