import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import player from '../../rpc/api/player.js';
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

    player.open({ albumid }, (err, res) => {
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
      <Button content='Play' icon='play' labelPosition='left' loading={this.state.loading} color='black' onClick={this._onPlay.bind(this)} />
    );
  }
}

export default AlbumPlayButton;
