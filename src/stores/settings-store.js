import Dispatcher from '../dispatcher/';
import Constants from '../constants';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import debug from '../util/debug.js';

const CHANGE_EVENT = 'change';
const LOCALSTORAGE_KEY = 'settings';

const logger = debug('store:settings');

const _defaultSettings = {
  checkForUpdatesOnInitialState: true,
  ipAddress: location.hostname,
  ajaxPort: 8080,
  webSocketPort: 9090,
  itemsPerPage: 50,
  itemsPerRow: 10
};

let settings = assign({}, _defaultSettings);

if(localStorage[LOCALSTORAGE_KEY]) {
  const storedSettingsString = localStorage[LOCALSTORAGE_KEY];

  try {
    const storedSettings = JSON.parse(storedSettingsString);

    if(typeof storedSettings === 'object') {
      settings = assign({}, settings, storedSettings);
    }
  } catch(e) {
    logger('Failed to load settings from localStorage, using defaults', e);
  }
} else {
  logger('No record found in localStorage. Using default settings.');
}

function setSettings(newSettings) {
  settings = assign({}, settings, newSettings);
  localStorage[LOCALSTORAGE_KEY] = JSON.stringify(settings);
}

let SettingsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return settings;
  }

});

SettingsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case Constants.SettingsActions.SET_SETTINGS:
      setSettings(action.settings);
      SettingsStore.emitChange();
      break;

    default:
      // ignore
  }
});

export default SettingsStore;
