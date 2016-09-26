import Dispatcher from '../dispatcher';
import Constants from '../constants';

export function addNotification(notification) {
  Dispatcher.dispatch({
    type: Constants.NotificationActions.ADD_NOTIFICATION,
    notification
  });
}
