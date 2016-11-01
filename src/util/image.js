import SettingsStore from '../stores/settings-store.js';
import { isMockMode } from '../util/env.js';

export function prefixImage(url) {
  if(isMockMode) {

    const decoded = decodeURIComponent(url.replace('image://', ''));
    return decoded.substr(0, decoded.length - 1);

  } else {

    const settings = SettingsStore.get();
    const address = `http://${settings.ipAddress}:${settings.ajaxPort}/`;

    return `${address}image/${encodeURIComponent(url)}`;

  }
}
