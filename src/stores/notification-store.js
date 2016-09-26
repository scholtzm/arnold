import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let notifications = [];

let NotificationStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return notifications;
  },

  getLast: function() {
    return notifications[notifications.length - 1];
  }

});

NotificationStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.NotificationActions.ADD_NOTIFICATION:
      notifications.push(action.notification);
      NotificationStore.emitChange();
      break;

    default:
      // ignore
  }
});

export default NotificationStore;
