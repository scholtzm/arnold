const shell = require('gulp-shell');

module.exports = function build(callback) {
  const command = 'npm run build';
  return shell.task([ command ])(callback);
};
