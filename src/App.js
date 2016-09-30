import React, { Component } from 'react';
import { Menu, Search } from 'stardust';
import { Link } from 'react-router';
import MovieStore from './stores/movie-store.js';

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

    let results = {
      'movies': {
        name: 'movies',
        results: movies
          .filter(movie => movie.originaltitle.toLowerCase().indexOf(value.toLowerCase()) > -1)
          .map(movie => {
            return {
              title: movie.originaltitle,
              description: movie.year,
              image: movie.thumbnail,
            }
          })
      }
    };

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
