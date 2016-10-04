import React, { Component } from 'react';
import { Button, Icon } from 'stardust';

import player from '../../ajax/player.js';
import { addNotification } from '../../actions/notification-actions.js';

class AlbumPlayButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    };
  }

  _onPlay() {
    const albumid = this.props.album.albumid;

    this.setState({loading: true});
    addNotification({
      title: 'Starting album',
      message: this.props.album.label,
      level: 'info'
    });

    player.openAlbum(albumid, (err, res) => {
      if(err) {
        addNotification({
          title: 'Unable to play album',
          level: 'error'
        });
      } else {
        addNotification({
          title: 'Playing album',
          message: this.props.album.albumid,
          level: 'success'
        });
      }

      this.setState({loading: false});
    })
  }

  render() {
    return (
      <Button labeled loading={this.state.loading} icon color='black' onClick={this._onPlay.bind(this)}>
        <Icon name='play' /> Play
      </Button>
    );
  }
}

export default AlbumPlayButton;
