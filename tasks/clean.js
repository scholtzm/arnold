const del = require('del');

function clean(callback) {
  del(['package'])
    .then(() => callback())
    .catch(error => callback(error));
}

module.exports = clean;
