import React, { Component } from 'react';
import { Button, Icon } from 'stardust';

import player from '../../ajax/player.js';
import { addNotification } from '../../actions/notification-actions.js';

class TvShowPlayButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    };
  }

  _onPlay() {
    const tvshowid = this.props.tvShow.tvshowid;

    this.setState({loading: true});
    addNotification({
      title: 'Starting TV show',
      message: this.props.tvShow.title,
      level: 'info'
    });

    player.openTvShow(tvshowid, (err, res) => {
      if(err) {
        addNotification({
          title: 'Unable to play TV show',
          level: 'error'
        });
      } else {
        addNotification({
          title: 'Playing TV show',
          message: this.props.tvShow.title,
          level: 'success'
        });
      }

      this.setState({loading: false});
    })
  }

  render() {
    const color = this.props.tvShow.playcount === 0
      ? 'black'
      : 'grey';

    return (
      <Button labeled loading={this.state.loading} icon color={color} onClick={this._onPlay.bind(this)}>
        <Icon name='play' /> Play
      </Button>
    );
  }
}

export default TvShowPlayButton;
