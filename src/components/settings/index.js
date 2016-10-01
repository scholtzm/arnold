import React, { Component } from 'react';
import { Grid, Button } from 'stardust';
import BasicHeader from '../misc/basic-header.js';
import BasicContainer from '../misc/basic-container.js';
import SettingsForm from './settings-form.js';
import { checkUpdate } from '../../util/updater.js';

class Settings extends Component {
  render() {
    return (
      <BasicContainer>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <BasicHeader icon='settings' text='Settings' subtext='Adjust your settings and preferences' />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button basic color='green' onClick={() => checkUpdate(true)}>Check for updates</Button>
              <Button basic color='blue' onClick={() => localStorage.clear()}>Clear local storage</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <SettingsForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </BasicContainer>
    );
  }
}

export default Settings;
