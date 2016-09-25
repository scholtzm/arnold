import React, { Component } from 'react';
import { Container } from 'stardust';
import BasicHeader from '../misc/basic-header.js';
import SettingsForm from './settings-form.js';

class Settings extends Component {
  render() {
    return (
      <Container fluid style={{ padding: '0 15px' }}>
        <BasicHeader icon='settings' text='Settings' subtext='Adjust your settings and preferences' />
        <SettingsForm />
      </Container>
    );
  }
}

export default Settings;
