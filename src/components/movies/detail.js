import React, { Component } from 'react';
import { Modal, Image, Button, Rating } from 'stardust';
import PlayMovieButton from './play-movie-button.js';

class MovieDetail extends Component {

  render() {
    if(!this.props.active) {
      return <div/>;
    }

    const movie = this.props.movie;
    const runtimeHours = Math.floor(movie.runtime / 60 / 60);
    const runtimeMinutes = Math.floor((movie.runtime % (runtimeHours * 60 * 60)) / 60);

    return (
      <Modal active={this.props.active} onHide={this.props.hide}>
        <Modal.Header>{movie.originaltitle} ({movie.year})</Modal.Header>
        <Modal.Content image>
          <Image wrapped className='medium' src={movie.thumbnail} />
          <Modal.Description>
            <p>{movie.plot}</p>
            <p><b>Directed by:</b> {movie.director[0]}</p>
            <p><b>Year:</b> {movie.year}</p>
            <p><b>Rating:</b> {movie.rating.toFixed(1)} <Rating defaultRating={Math.round(movie.rating)} maxRating={10} icon='star' disabled /></p>
            <p><b>Runtime:</b> {runtimeHours} hour{runtimeHours > 1 ? 's' : ''} {runtimeMinutes} minute{runtimeMinutes > 1 ? 's' : ''}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <PlayMovieButton movie={movie} />
          <Button color='black' onClick={this.props.hide}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default MovieDetail;
