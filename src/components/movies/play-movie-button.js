import React, { Component } from 'react';
import { Button, Icon } from 'stardust';

import { playMovie } from '../../ajax/movies.js';

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

    playMovie(movieid, (err, res) => {
      this.setState({loading: false});
    })
  }

  render() {
    const color = this.props.movie.playcount === 0
      ? 'blue'
      : 'black';

    return (
      <Button labeled loading={this.state.loading} icon color={color} onClick={this._onPlay.bind(this)}>
        <Icon name='play' /> Play
      </Button>
    );
  }
}

export default PlayMovieButton;
