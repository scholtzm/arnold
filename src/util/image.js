import SettingsStore from '../stores/settings-store.js';

export function fixImageUrl(url) {
  const settings = SettingsStore.get();
  const isUsingStaticTransportLayer = settings.transportLayer === 'static';

  if(isUsingStaticTransportLayer) {
    const decoded = decodeURIComponent(url.replace('image://', ''));
    return decoded.substr(0, decoded.length - 1).replace('http://', 'https://');
  } else {
    const address = `http://${settings.ipAddress}:${settings.ajaxPort}/`;
    return `${address}image/${encodeURIComponent(url)}`;
  }
}
