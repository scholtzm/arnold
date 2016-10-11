import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

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

    player.open({ episodeid }, (err, res) => {
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
      <Button content='Play' icon='play' labelPosition='left' loading={this.state.loading} color={color} onClick={this._onPlay.bind(this)} />
    );
  }
}

export default PlayEpisodeButton;
