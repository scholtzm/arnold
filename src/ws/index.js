import debug from 'debug';
import SettingsStore from '../stores/settings-store.js';

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
    isOpen = false;
  };

  socket.onclose = function(event) {
    logger('event close', event);
    isOpen = false;
  };

  socket.onmessage = function(event) {
    logger('event message', event);
  };
}

export function close() {
  debug('close');

  if(!isOpen) {
    return;
  }

  socket.close();
}

export function send(data) {
  debug('send', data);

  if(!isOpen) {
    return;
  }

  if(typeof data === 'object') {
    data = JSON.stringify(data);
  }

  socket.send(data);
}

function setBaseUrl() {
  const settings = SettingsStore.get();
  baseUrl = `ws://${settings.ipAddress}:${settings.webSocketPort}/jsonrpc`;
  close();
  connect();
}

SettingsStore.addChangeListener(setBaseUrl);

setBaseUrl();
