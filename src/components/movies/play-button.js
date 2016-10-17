import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import player from '../../rpc/api/player.js';
import { addNotification } from '../../actions/notification-actions.js';

class PlayMovieButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    };
  }

  _onPlay() {
    const movieid = this.props.movie.movieid;

    this.setState({loading: true});

    player.open({ movieid }, (err, res) => {
      if(err) {
        addNotification({
          title: 'Unable to play movie',
          level: 'error'
        });
      } else {
        addNotification({
          title: 'Playing movie',
          message: this.props.movie.originaltitle,
          level: 'success'
        });
      }

      this.setState({loading: false});
    })
  }

  render() {
    const color = this.props.movie.playcount === 0
      ? 'black'
      : 'grey';

    return (
      <Button content='Play' icon='play' labelPosition='left' loading={this.state.loading} color={color} onClick={this._onPlay.bind(this)} />
    );
  }
}

export default PlayMovieButton;
