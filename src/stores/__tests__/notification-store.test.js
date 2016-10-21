import NotificationStore from '../notification-store.js';
import { addNotification } from '../../actions/notification-actions.js';

const emptyNotifications = [];

const dummyNotification1 = {
  foo: 'bar'
};

const dummyNotification2 = {
  baz: 'bar'
};

it('provides notifications', () => {
  const notifications = NotificationStore.getAll();
  expect(notifications).toEqual(emptyNotifications);
});

it('tracks notifications', () => {
  addNotification(dummyNotification1);

  let notifications = NotificationStore.getAll();
  expect(notifications).toEqual([dummyNotification1]);

  addNotification(dummyNotification2);

  notifications = NotificationStore.getAll();
  expect(notifications).toEqual([dummyNotification1, dummyNotification2]);

  const lastNotification = NotificationStore.getLast();
  expect(lastNotification).toEqual(dummyNotification2);
});

it('emits change event', () => {
  const mockListener1 = jest.fn();
  const mockListener2 = jest.fn();

  NotificationStore.addChangeListener(mockListener1);
  NotificationStore.addChangeListener(mockListener2);

  addNotification(dummyNotification1);

  expect(mockListener1).toHaveBeenCalledTimes(1);
  expect(mockListener2).toHaveBeenCalledTimes(1);

  NotificationStore.removeChangeListener(mockListener2);

  addNotification(dummyNotification2);

  expect(mockListener1).toHaveBeenCalledTimes(2);
  expect(mockListener2).toHaveBeenCalledTimes(1);
});
