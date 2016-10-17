import debug from '../../util/debug.js';
import SettingsStore from '../../stores/settings-store.js';
import { addNotification } from '../../actions/notification-actions.js';

const logger = debug('ajax:request');
let baseUrl;

function setBaseUrl() {
  const settings = SettingsStore.get();
  baseUrl = `http://${settings.ipAddress}:${settings.ajaxPort}/jsonrpc`;
}

SettingsStore.addChangeListener(setBaseUrl);

setBaseUrl();

export function request(method, params, callback) {
  fetch(`${baseUrl}?${method}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'Arnold',
        method,
        params
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      logger('success', json);

      callback(null, json);
    }).catch(function(err) {
      logger('error', err);

      addNotification({
        title: 'AJAX Request',
        message: 'AJAX request has failed.',
        level: 'error'
      });

      callback(err);
    });
};
