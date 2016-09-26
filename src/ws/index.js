import debug from 'debug';
import SettingsStore from '../stores/settings-store.js';
import { addNotification } from '../actions/notification-actions.js';

const logger = debug('socket:client');

let socket;
let baseUrl;
let isOpen = false;

export function connect() {
  logger('connect');
  socket = new WebSocket(baseUrl);

  socket.onopen = function(event) {
    logger('event open', event);
    isOpen = true;
  };

  socket.onerror = function(event) {
    logger('event error', event);

    addNotification({
      title: 'WebSocket Client',
      message: 'WebSocket client received error and got disconnected.',
      level: 'error'
    });

    isOpen = false;
  };

  socket.onclose = function(event) {
    logger('event close', event);

    addNotification({
      title: 'WebSocket Client',
      message: 'WebSocket client connection has been closed.',
      level: 'warning'
    });

    isOpen = false;
  };

  socket.onmessage = function(event) {
    logger('event message', event);
  };
}

export function close() {
  logger('close');

  if(!isOpen) {
    return;
  }

  socket.close();
}

export function send(data) {
  logger('send', data);

  if(!isOpen) {
    return;
  }

  if(typeof data === 'object') {
    data = JSON.stringify(data);
  }

  socket.send(data);
}

function setBaseUrl(reconnect) {
  logger('settings base url');
  const settings = SettingsStore.get();
  baseUrl = `ws://${settings.ipAddress}:${settings.webSocketPort}/jsonrpc`;

  if(reconnect) {
    close();
    setTimeout(() => connect(), 2000);
  }
}

SettingsStore.addChangeListener(() => setBaseUrl(true));

setBaseUrl(false);
