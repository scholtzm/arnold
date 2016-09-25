import React, { Component } from 'react';
import { Modal, Image, Button, Header } from 'stardust';

class MovieDetail extends Component {

  render() {
    if(!this.props.active) {
      return <div/>;
    }

    const movie = this.props.movie;

    return (
      <Modal dimmer='blurring' active={this.props.active} onHide={this.props.hide}>
        <Modal.Header>{movie.originaltitle}</Modal.Header>
        <Modal.Content image>
          <Image wrapped className='medium' src={movie.thumbnail} />
          <Modal.Description>
            <Header>{movie.tagline}</Header>
            <p>{movie.plot}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.props.hide}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default MovieDetail;
