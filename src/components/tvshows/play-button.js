import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

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

    player.open({ tvshowid }, (err, res) => {
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
      <Button content='Play' icon='play' labelPosition='left' loading={this.state.loading} color={color} onClick={this._onPlay.bind(this)} />
    );
  }
}

export default TvShowPlayButton;
