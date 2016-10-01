import request from './request.js';

function open(item, callback) {
  const params = {
    item
  };

  request('Player.Open', params, callback);
}

function openMovie(movieid, callback) {
  open({ movieid }, callback);
}

export default {
  open,
  openMovie
}
