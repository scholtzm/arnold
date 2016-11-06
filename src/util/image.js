import SettingsStore from '../stores/settings-store.js';
import { isDemoMode } from '../util/env.js';

export function prefixImage(url) {
  if(isDemoMode) {

    const decoded = decodeURIComponent(url.replace('image://', ''));
    return decoded.substr(0, decoded.length - 1).replace('http://', 'https://');

  } else {

    const settings = SettingsStore.get();
    const address = `http://${settings.ipAddress}:${settings.ajaxPort}/`;

    return `${address}image/${encodeURIComponent(url)}`;

  }
}
