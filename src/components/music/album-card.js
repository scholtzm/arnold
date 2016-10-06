import React, { Component } from 'react';
import { Card, Image, Container } from 'semantic-ui-react';
import PlayAlbumButton from './play-button.js';

class AlbumCard extends Component {

  render() {
    const { album, showDetail } = this.props;

    return (
      <Card>
        <Image src={album.thumbnail} onClick={showDetail} style={{cursor: 'pointer'}} />
        <Card.Content>
          <Card.Header>
            {album.label}
          </Card.Header>
          <Card.Description>
            {album.artist[0]}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Container textAlign='center'>
            <PlayAlbumButton album={album} />
          </Container>
        </Card.Content>
      </Card>
    );
  }
}

export default AlbumCard;
