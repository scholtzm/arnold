import React, { Component } from 'react';
import MovieGrid from './grid.js';
import LibraryPage from '../library/page.js';

class Movies extends Component {
  state = {
    showSeen: true
  };

  _onShowSeenToggle() {
    this.setState({
      showSeen: !this.state.showSeen
    });
  }

  render() {
    return (
      <LibraryPage headerIcon='film' headerText='Movies' headerSubText='Manage your movies collection' grid={MovieGrid} />
    );
  }
}

export default Movies;
