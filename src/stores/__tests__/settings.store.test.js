import SettingsStore from '../settings-store.js';
import { setSettings } from '../../actions/settings-actions.js';

const defaultSettings = {
  checkForUpdatesOnInitialLoad: true,
  transportLayer: 'websocket',
  ipAddress: location.hostname,
  ajaxPort: 8080,
  webSocketPort: 9090,
  itemsPerRow: 10
};

const mockSettings = {
  checkForUpdatesOnInitialLoad: false,
  transportLayer: 'ajax',
  ipAddress: '0.0.0.0',
  ajaxPort: 80,
  webSocketPort: 90,
  itemsPerRow: 8
};

it('provides settings', () => {
  const settings = SettingsStore.get();
  expect(settings).toBeDefined();
  expect(settings).toEqual(defaultSettings);
});

it('tracks settings changes', () => {
  const mockListener = jest.fn();
  SettingsStore.addChangeListener(mockListener);

  setSettings(mockSettings);

  expect(mockListener).toHaveBeenCalled();

  const settings = SettingsStore.get();
  expect(settings).toBeDefined();
  expect(settings).toEqual(mockSettings);
});

it('emits change event', () => {
  const mockListener1 = jest.fn();
  const mockListener2 = jest.fn();

  SettingsStore.addChangeListener(mockListener1);
  SettingsStore.addChangeListener(mockListener2);

  setSettings(mockSettings);

  expect(mockListener1).toHaveBeenCalledTimes(1);
  expect(mockListener2).toHaveBeenCalledTimes(1);

  SettingsStore.removeChangeListener(mockListener2);

  setSettings(mockSettings);

  expect(mockListener1).toHaveBeenCalledTimes(2);
  expect(mockListener2).toHaveBeenCalledTimes(1);
});
