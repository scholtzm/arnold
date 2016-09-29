import React, { Component } from 'react';
import { Grid } from 'stardust';
import BasicHeader from '../misc/basic-header.js';
import BasicContainer from '../misc/basic-container.js';
import MovieGrid from './grid.js';
import MovieControls from './movie-controls.js';

class Movies extends Component {
  state = {
    showSeen: true
  };

  _onShowSeenToggle() {
    this.setState({
      showSeen: !this.state.showSeen
    });
  }

  render() {
    return (
      <BasicContainer>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <BasicHeader icon='film' text='Movies' subtext='Manage your movies collection' />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <MovieControls onShowSeenToggle={this._onShowSeenToggle.bind(this)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <MovieGrid showSeen={this.state.showSeen} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </BasicContainer>
    );
  }
}

export default Movies;
