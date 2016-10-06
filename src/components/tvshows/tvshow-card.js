import React, { Component } from 'react';
import { Card, Image, Container } from 'semantic-ui-react';

import PlayTvShowButton from './play-button.js';

class TvShowCard extends Component {
  render() {
    return (
      <Card>
        <Image src={this.props.tvShow.thumbnail} onClick={this.props.showDetail} style={{cursor: 'pointer'}} />
        <Card.Content>
          <Card.Header>
            {this.props.tvShow.title}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {this.props.tvShow.year}
            </span>
          </Card.Meta>
          <Card.Description>
            {this.props.tvShow.studio[0]}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Container textAlign='center'>
            <PlayTvShowButton tvShow={this.props.tvShow} />
          </Container>
        </Card.Content>
      </Card>
    );
  }
}

export default TvShowCard;
