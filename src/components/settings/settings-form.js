import React, { Component } from 'react';
import { Form, Button } from 'stardust';
import SettingsStore from '../../stores/settings-store.js';
import { setSettings } from '../../actions/settings-actions.js';

class SettingsForm extends Component {
  state = SettingsStore.get()

  _handleSubmit(e, serializedForm) {
    e.preventDefault();
    this.setState(serializedForm);
    setSettings(serializedForm);
  }

  render() {
    return (
      <Form onSubmit={this._handleSubmit.bind(this)}>
        <Form.Input label='Kodi IP Address' name='ipAddress' placeholder='localhost' defaultValue={this.state.ipAddress} />
        <Form.Group widths='equal'>
          <Form.Input label='AJAX Port' name='ajaxPort' placeholder='8080' defaultValue={this.state.ajaxPort} />
          <Form.Input label='WebSocket Port' name='webSocketPort' placeholder='9090' defaultValue={this.state.webSocketPort} />
        </Form.Group>
        <Button primary type='submit'>Save</Button>
      </Form>
    );
  }
}

export default SettingsForm;
