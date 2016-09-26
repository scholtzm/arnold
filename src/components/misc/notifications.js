import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import NotificationStore from '../../stores/notification-store.js';

class Notifications extends Component {
  constructor(...args) {
    super(...args);

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    const lastNotification = NotificationStore.getLast();

    this.refs.notificationSystem.addNotification(lastNotification);
  }

  componentDidMount() {
    NotificationStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    NotificationStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <NotificationSystem ref='notificationSystem' />
    );
  }
}

export default Notifications;
