import SettingsStore from '../../stores/settings-store.js';

const settings = SettingsStore.get();

let exported = {};

if(settings.transportLayer === 'websocket') {
  exported.request = require('../ws/').request;
} else if(settings.transportLayer === 'ajax') {
  exported.request = require('../ajax/').request;
}

module.exports = exported;
