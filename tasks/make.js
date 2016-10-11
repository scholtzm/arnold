const gulp = require('gulp');
const build = require('./build.js');
const pack = require('./pack.js');

const patch = require('./patch-package-json.js');

module.exports = gulp.series(
  patch.patchPackageJson,
  build,
  pack,
  patch.unpatchPackageJson
);
