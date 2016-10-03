import React, { Component } from 'react';
import TvShowGrid from './grid.js';
import LibraryPage from '../library/page.js';

class TvShows extends Component {
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
      <LibraryPage headerIcon='television' headerText='TV Shows' headerSubText='Manage your TV show collection' grid={TvShowGrid} />
    );
  }
}

export default TvShows;
