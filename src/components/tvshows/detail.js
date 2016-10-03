import React, { Component } from 'react';
import { Modal, Image, Button, Rating, Progress } from 'stardust';
import PlayTvShowButton from './play-button.js';

class TvShowDetail extends Component {

  render() {
    if(!this.props.active) {
      return <div/>;
    }

    const tvShow = this.props.tvShow;
    const progress = Math.floor((tvShow.watchedepisodes / tvShow.episode) * 100);

    return (
      <Modal open={this.props.active} onClose={this.props.hide}>
        <Modal.Header>{tvShow.title} ({tvShow.year})</Modal.Header>
        <Modal.Content image>
          <Image wrapped bordered shape='rounded' className='medium' src={tvShow.thumbnail} />
          <Modal.Description>
            <div>{tvShow.plot}</div>
            <div style={{padding: '10px 0'}}>
              <div><b>Studio:</b> {tvShow.studio[0]}</div>
              <div><b>Year:</b> {tvShow.year}</div>
              <div><b>Rating:</b> {tvShow.rating.toFixed(1)} <Rating defaultRating={Math.round(tvShow.rating)} maxRating={10} icon='star' disabled /></div>
              <div>
                <b>Progress:</b> seen {tvShow.watchedepisodes} out of {tvShow.episode} episodes available in the library
                <Progress percent={progress} size='tiny' color='green' />
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <PlayTvShowButton tvShow={tvShow} />
          <Button color='black' onClick={this.props.hide}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default TvShowDetail;
