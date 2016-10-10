import SettingsStore from '../stores/settings-store.js';

export function prefixImage(url) {
  const settings = SettingsStore.get();
  const address = `http://${settings.ipAddress}:${settings.ajaxPort}/`;

  return `${address}../../image/${encodeURIComponent(url)}`;
}
