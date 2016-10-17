import { init as initFluxListeners } from './flux-listeners.js';
import { connect as connectWebSockets } from './ws/';

export function init(transportLayer) {
  if(transportLayer === 'websocket') {
    connectWebSockets();
  }

  initFluxListeners();
}
