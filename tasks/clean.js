const del = require('del');
const gutil = require('gulp-util');

function clean(cb) {
  del(['package'])
    .then(() => cb())
    .catch(error => {
      throw new gutil.PluginError('[clean]', error);
    });
}

module.exports = clean;
