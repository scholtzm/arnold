import React, { Component } from 'react';
import BasicHeader from '../misc/basic-header.js';
import BasicContainer from '../misc/basic-container.js';
import SettingsForm from './settings-form.js';

class Settings extends Component {
  render() {
    return (
      <BasicContainer>
        <BasicHeader icon='settings' text='Settings' subtext='Adjust your settings and preferences' />
        <SettingsForm />
      </BasicContainer>
    );
  }
}

export default Settings;
