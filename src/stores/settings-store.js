import { EventEmitter } from 'events';
import assign from 'object-assign';

import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import storage from '../util/storage.js';
import { isDemoMode } from '../util/env.js';

const CHANGE_EVENT = 'change';
const LOCAL_STORAGE_KEY = 'SettingsStore';

const _defaultSettings = {
  checkForUpdatesOnInitialLoad: true,
  transportLayer: 'ajax',
  ipAddress: location.hostname,
  ajaxPort: 8080,
  webSocketPort: 9090,
  itemsPerRow: 10
};

if(isDemoMode) {
  _defaultSettings.transportLayer = 'static';
}

class SettingsStore extends EventEmitter {

  constructor() {
    super();

    this.settings = assign({}, _defaultSettings);

    const storedSettings = storage.getSync(LOCAL_STORAGE_KEY);
    if(storedSettings !== null) {
      this.settings = assign({}, this.settings, storedSettings);
    }
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

  get() {
    return this.settings;
  }

  setSettings(newSettings) {
    this.settings = assign({}, this.settings, newSettings);
    storage.setSync(LOCAL_STORAGE_KEY, this.settings);
    this.emitChange();
  }

};

const settingsStore = new SettingsStore();

SettingsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.SettingsActions.SET_SETTINGS:
      settingsStore.setSettings(action.settings);
      break;

    default:
      // ignore
  }
});

export default settingsStore;
