import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import BasicHeader from '../misc/basic-header.js';
import BasicContainer from '../misc/basic-container.js';
import SettingsForm from './settings-form.js';
import { checkUpdate } from '../../util/updater.js';
import { addNotification } from '../../actions/notification-actions.js';
import storage from '../../util/storage.js';
import debug from '../../util/debug.js';

const logger = debug('components:settings');

class Settings extends Component {
  _clearStorage() {
    storage.clear()
      .then(() => {
        addNotification({
          title: 'Local Storage',
          message: 'Local storage has been cleared.',
          level: 'info'
        });
      })
      .catch(err => {
        addNotification({
          title: 'Local Storage',
          message: 'Failed to clear local storage.',
          level: 'error'
        });

        logger('Failed to clear storage', err);
      });
  }

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
              <Button basic color='blue' onClick={this._clearStorage}>Clear local storage</Button>
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
