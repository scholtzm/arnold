import React, { Component } from 'react';
import { Button, Icon } from 'stardust';

import player from '../../ajax/player.js';
import { addNotification } from '../../actions/notification-actions.js';

class PlayEpisodeButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    };
  }

  _onPlay() {
    const episodeid = this.props.episode.episodeid;

    this.setState({loading: true});
    addNotification({
      title: 'Starting episode',
      message: this.props.episode.label,
      level: 'info'
    });

    player.openTvShowEpisode(episodeid, (err, res) => {
      if(err) {
        addNotification({
          title: 'Unable to play episode',
          level: 'error'
        });
      } else {
        addNotification({
          title: 'Playing episode',
          message: this.props.episode.label,
          level: 'success'
        });
      }

      this.setState({loading: false});
    })
  }

  render() {
    const color = this.props.episode.playcount === 0
      ? 'black'
      : 'grey';

    return (
      <Button labeled loading={this.state.loading} icon color={color} onClick={this._onPlay.bind(this)}>
        <Icon name='play' /> Play
      </Button>
    );
  }
}

export default PlayEpisodeButton;
