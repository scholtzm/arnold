import request from './request.js';

function scan(callback) {
  request('AudioLibrary.Scan', {}, callback);
}

function clean(callback) {
  request('AudioLibrary.Clean', {}, callback);
}

export default {
  scan,
  clean
}
