import SettingsStore from '../../stores/settings-store.js';
import { request as ajaxRequest } from '../ajax/';
import { request as wsRequest } from '../ws/';
import { request as staticRequest } from '../static/';

export function request(...args) {
  const transportLayer = SettingsStore.get().transportLayer;

  if(transportLayer === 'websocket') {
    wsRequest(...args);
  } else if(transportLayer === 'ajax') {
    ajaxRequest(...args);
  } else if(transportLayer === 'static') {
    staticRequest(...args);
  } else {
    throw new Error('Unknown transport layer', transportLayer)
  }
}
