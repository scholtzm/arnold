import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class NotificationStore extends EventEmitter {

  constructor() {
    super();

    this.notifications = [];
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAll() {
    return this.notifications;
  }

  getLast() {
    return this.notifications[this.notifications.length - 1];
  }

  addNotification(notification) {
    this.notifications.push(notification);
    this.emitChange();
  }

};

const notificationStore = new NotificationStore();

NotificationStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.NotificationActions.ADD_NOTIFICATION:
      notificationStore.addNotification(action.notification);
      break;
  }
});

export default notificationStore;
