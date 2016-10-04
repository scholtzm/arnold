import React, { Component } from 'react'
import { Card } from 'stardust'

import LoaderSegment from '../misc/loader-segment.js';
import ReloadSegment from '../misc/reload-segment.js';
import AlbumStore from '../../stores/album-store.js';
import SettingsStore from '../../stores/settings-store.js';
import { getAlbums } from '../../actions/album-actions.js';
import AlbumCard from './album-card.js';
import AlbumDetail from './detail.js';

class AlbumGrid extends Component {

  constructor(props, context) {
    super(props, context);

    const settings = SettingsStore.get();
    const storeState = AlbumStore.get();

    this.state = {
      albums: storeState.albums,
      lastFetchFailed: false,
      loading: true,
      itemsPerPage: settings.itemsPerPage,
      itemsPerRow: settings.itemsPerRow,
      detailActive: false
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    const storeState = AlbumStore.get();

    this.setState({
      loading: false,
      albums: storeState.albums,
      lastFetchFailed: storeState.lastFetchFailed
    });
  }

  _onReload() {
    this.setState({
      loading: true
    });

    getAlbums();
  }

  _showDetail(album) {
    this.setState({
      detailActive: true,
      detailAlbum: album
    });
  }

  _hideDetail() {
    this.setState({
      detailActive: false
    });
  }

  componentDidMount() {
    AlbumStore.addChangeListener(this._onChange);

    if(this.state.albums.length > 0) {
      this.setState({loading: false});
    }

    getAlbums();
  }

  componentWillUnmount() {
    AlbumStore.removeChangeListener(this._onChange);
  }

  render() {
    if(this.state.loading) {
      return <LoaderSegment />;
    }

    if(!this.state.loading && this.state.lastFetchFailed === true) {
      return <ReloadSegment message='Failed to load albums' onClick={this._onReload.bind(this)} />
    }

    let detail;
    if(this.state.detailActive) {
      detail = <AlbumDetail active={this.state.detailActive} album={this.state.detailAlbum} hide={() => this._hideDetail()} />;
    } else {
      detail = null;
    }

    return (
      <div>
        {detail}

        <Card.Group itemsPerRow={this.state.itemsPerRow}>
          {
            this.state.albums
              .filter(album => this.props.showSeen || album.playcount === 0)
              .map(album => <AlbumCard key={album.albumid} album={album} showDetail={() => this._showDetail(album)} />)
          }
        </Card.Group>
      </div>
    )
  }

};

export default AlbumGrid;
