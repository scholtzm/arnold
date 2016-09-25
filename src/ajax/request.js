import request from 'superagent';
import debug from 'debug';
import SettingsStore from '../stores/settings-store.js';

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
      id: 1,
      params
    })
    .end((err, res) => {
      logger(err, res);
      callback(err, res);
    });
};
