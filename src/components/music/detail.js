import React, { Component } from 'react';
import { Modal, Image, Button } from 'stardust';
import PlayAlbumButton from './play-button.js';
import SongStore from '../../stores/song-store.js';
import { getSongs } from '../../actions/song-actions.js';
import SongTable from './song-table.js';

class AlbumDetail extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      songs: [],
    };

    this._onSongsChange = this._onSongsChange.bind(this);
  }

  _onSongsChange() {
    const { album } = this.props;
    const songs = SongStore.getBy(album.albumid);

    this.setState({
      songs
    });
  }

  componentDidMount() {
    const { album } = this.props;
    SongStore.addChangeListener(this._onSongsChange);

    getSongs(album.albumid);
  }

  componentWillUnmount() {
    SongStore.removeChangeListener(this._onSongsChange);
  }

  render() {
    const album = this.props.album;

    return (
      <Modal open={this.props.active} onClose={this.props.hide}>
        <Modal.Header>{album.label}</Modal.Header>
        <Modal.Content image>
          <Image wrapped bordered shape='rounded' className='medium' src={album.thumbnail} />
          <Modal.Description>
            <div><b>Artist:</b> {album.artist[0]}</div>
            <div><b>Year:</b> {album.year}</div>
            <SongTable songs={this.state.songs} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <PlayAlbumButton album={album} />
          <Button color='black' onClick={this.props.hide}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default AlbumDetail;
