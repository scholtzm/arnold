import React, { Component } from 'react';
import { Container } from 'stardust';
import BasicHeader from '../misc/basic-header.js';
import Grid from './grid.js';

class Movies extends Component {
  render() {
    return (
      <Container fluid style={{ padding: '0 15px' }}>
        <BasicHeader icon='film' text='Movies' subtext='Manage your movies collection' />
        <Grid />
      </Container>
    );
  }
}

export default Movies;
