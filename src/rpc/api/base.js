import SettingsStore from '../../stores/settings-store.js';
import { request as ajaxRequest } from '../ajax/';
import { request as wsRequest } from '../ws/';

export function request(...args) {
  const settings = SettingsStore.get();

  if(settings.transportLayer === 'websocket') {
    wsRequest(...args);
  } else if(settings.transportLayer === 'ajax') {
    ajaxRequest(...args);
  }
}
