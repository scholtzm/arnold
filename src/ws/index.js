import debug from '../util/debug.js';
import SettingsStore from '../stores/settings-store.js';
import SocketClient from './client.js';
import { addNotification } from '../actions/notification-actions.js';

const logger = debug('socket:client');
let client;

let ip, port;

export function connect() {
  logger('connect', client);

  client = new SocketClient();

  client.on('open', event => {
    logger('open', event);

    addNotification({
      title: 'WebSocket Client',
      message: 'WebSocket client has connected to Kodi.',
      level: 'info',
      autoDismiss: 3
    });
  });

  client.on('close', event => {
    logger('close', event);

    addNotification({
      title: 'WebSocket Client',
      message: 'WebSocket client connection has been closed.',
      level: 'warning'
    });

    client = null;
  });

  client.on('error', event => {
    logger('error', event);

    addNotification({
      title: 'WebSocket Client',
      message: 'WebSocket client received error.',
      level: 'error'
    });
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
