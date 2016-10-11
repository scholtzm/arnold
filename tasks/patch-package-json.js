/**
 * Kodi requires the package to work properly from /addons/webinterface.ARNOLD
 * In order to coply with this, we need to build such package with `react-scripts`.
 * Easiest way is to temporarily patch package.json
 */

const fs = require('fs');

let originalPackageJson;

function patchPackageJson(callback) {
  originalPackageJson = fs.readFileSync('package.json');
  const parsed = JSON.parse(originalPackageJson);

  parsed.homepage = `http://localhost/addons/webinterface.${parsed.name.toUpperCase()}`;

  fs.writeFileSync('package.json', JSON.stringify(parsed, null, 2));

  callback();
}

function unpatchPackageJson(callback) {
  fs.writeFileSync('package.json', originalPackageJson);

  callback();
}

module.exports = {
  patchPackageJson,
  unpatchPackageJson
};
