import React, { Component } from 'react';
import { Form, Button, Header, Segment, Message } from 'stardust';
import SettingsStore from '../../stores/settings-store.js';
import { setSettings } from '../../actions/settings-actions.js';

class SettingsForm extends Component {
  state = {
    settings: SettingsStore.get(),
    submitted: false,
    success: false
  }

  _handleSubmit(e, serializedForm) {
    e.preventDefault();
    this.setState(serializedForm);
    setSettings(serializedForm);
    this.setState({
      submitted: true,
      success: true
    });
  }

  render() {
    return (
      <Form success={this.state.success} onSubmit={this._handleSubmit.bind(this)}>
        <Message
          success={this.state.success}
          hidden={!this.state.submitted}
          header='Saved'
          content='Settings have been saved.'
        />
        <Segment>
          <Header size='medium'>Connection</Header>
          <Form.Input label='Kodi IP Address' name='ipAddress' defaultValue={this.state.settings.ipAddress} />
          <Form.Group widths='equal'>
            <Form.Input label='AJAX Port' name='ajaxPort' type='number' defaultValue={this.state.settings.ajaxPort} />
            <Form.Input label='WebSocket Port' name='webSocketPort' type='number' defaultValue={this.state.settings.webSocketPort} />
          </Form.Group>
        </Segment>
        <Segment>
          <Header size='medium'>Display</Header>
          <Form.Group widths='equal'>
            <Form.Input label='Items per page' name='itemsPerPage' type='number' defaultValue={this.state.settings.itemsPerPage} />
            <Form.Input label='Items per row' name='itemsPerRow' type='number' defaultValue={this.state.settings.itemsPerRow} />
          </Form.Group>
        </Segment>
        <Button primary type='submit'>Save</Button>
      </Form>
    );
  }
}

export default SettingsForm;
