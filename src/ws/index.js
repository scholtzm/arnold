import debug from '../util/debug.js';
import SettingsStore from '../stores/settings-store.js';
import SocketClient from './client.js';
import { addNotification } from '../actions/notification-actions.js';

const logger = debug('socket:client');
const client = new SocketClient();

let ip, port;

export function connect() {
  logger('connect', client);

  client.on('open', event => {
    logger('open', event);
  });

  client.on('close', event => {
    logger('close', event);
  });

  client.on('error', event => {
    logger('error', event);
  });

  client.on('message', event => {
    logger('message', event);
  });

  client.connect(ip, port);
}

export function request(method, params, callback) {
  logger('request', method);

  client.request(method, params, (error, ...args) => {
    if(error) {
      addNotification({
        title: 'WebSocket Request',
        message: 'WebSocket request has failed.',
        level: 'error'
      });
    }

    callback(error, ...args);
  });
}

function setup(reconnect) {
  logger('running setup');

  const settings = SettingsStore.get();
  ip = settings.ipAddress;
  port = settings.webSocketPort;

  if(reconnect) {
    client.close();
    setTimeout(() => connect(), 2000);
  }
}

SettingsStore.addChangeListener(() => setup(true));

setup(false);
