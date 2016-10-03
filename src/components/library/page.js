import React, { Component } from 'react';
import { Grid } from 'stardust';
import BasicHeader from '../misc/basic-header.js';
import BasicContainer from '../misc/basic-container.js';
// import LibraryGrid from './grid.js';
import GridControls from './grid-controls.js';

class LibraryPage extends Component {
  state = {
    showSeen: true
  };

  _onShowSeenToggle() {
    this.setState({
      showSeen: !this.state.showSeen
    });
  }

  render() {
    const MovieGrid = this.props.grid;

    return (
      <BasicContainer>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <BasicHeader icon={this.props.headerIcon} text={this.props.headerText} subtext={this.props.headerSubText} />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <GridControls onShowSeenToggle={this._onShowSeenToggle.bind(this)}/>
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

export default LibraryPage;
