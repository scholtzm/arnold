import React, { Component } from 'react';
import MusicGrid from './grid.js';
import LibraryPage from '../library/page.js';

class Music extends Component {
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
      <LibraryPage headerIcon='music' headerText='Music' headerSubText='Manage your music collection' grid={MusicGrid} showControls={false} />
    );
  }
}

export default Music;
