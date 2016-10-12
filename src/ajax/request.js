import request from 'superagent';
import debug from '../util/debug.js';
import SettingsStore from '../stores/settings-store.js';
import { addNotification } from '../actions/notification-actions.js';

const logger = debug('ajax:request');
let baseUrl;

function setBaseUrl() {
  const settings = SettingsStore.get();
  baseUrl = `http://${settings.ipAddress}:${settings.ajaxPort}/jsonrpc`;
}

SettingsStore.addChangeListener(setBaseUrl);

setBaseUrl();

export default function(method, params, callback) {
  request
    .post(baseUrl)
    .query(method)
    .send({
      jsonrpc: '2.0',
      method: method,
      id: 'Arnold',
      params
    })
    .end((err, res) => {
      logger(err, res);

      if(err) {
        addNotification({
          title: 'AJAX Request',
          message: 'AJAX request has failed.',
          level: 'error'
        });
      }

      callback(err, res);
    });
};
