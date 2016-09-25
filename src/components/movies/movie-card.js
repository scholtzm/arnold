import React, { Component } from 'react';
import { Card, Image, Container } from 'stardust';

import PlayMovieButton from './play-movie-button.js';

class MovieCard extends Component {
  render() {
    return (
      <Card>
        <Image src={this.props.movie.thumbnail} onClick={this.props.showDetail} style={{cursor: 'pointer'}} />
        <Card.Content>
          <Card.Header>
            {this.props.movie.originaltitle}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {this.props.movie.year}
            </span>
          </Card.Meta>
          <Card.Description>
            {this.props.movie.tagline}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Container textAlign='center'>
            <PlayMovieButton movie={this.props.movie} />
          </Container>
        </Card.Content>
      </Card>
    );
  }
}

export default MovieCard;
