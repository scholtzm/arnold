import React, { Component } from 'react';
import { Grid } from 'stardust';
import BasicHeader from '../misc/basic-header.js';
import BasicContainer from '../misc/basic-container.js';
import Controls from './controls.js';

class Remote extends Component {
  render() {
    return (
      <BasicContainer>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <BasicHeader icon='television' text='Remote' subtext='Control your Kodi' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Controls />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </BasicContainer>
    );
  }
}

export default Remote;
