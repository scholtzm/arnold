import request from './request.js';

// NOTE: `volume` can be 'decrement' or 'increment'
function setVolume(volume, callback) {
  const params = {
    volume
  };

  request('Application.SetVolume', params, callback);
}

function setMute(callback) {
  request('Application.SetMute', { mute: 'toggle' }, callback);
}

export default {
  setVolume,
  setMute
}
