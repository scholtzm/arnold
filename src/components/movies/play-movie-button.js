import React, { Component } from 'react';
import { Button, Icon } from 'stardust';

import { playMovie } from '../../ajax/movies.js';
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
    addNotification({
      title: 'Starting movie',
      message: this.props.movie.originaltitle,
      level: 'info'
    });

    playMovie(movieid, (err, res) => {
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
      <Button labeled loading={this.state.loading} icon color={color} onClick={this._onPlay.bind(this)}>
        <Icon name='play' /> Play
      </Button>
    );
  }
}

export default PlayMovieButton;
