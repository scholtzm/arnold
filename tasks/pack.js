const gulp = require('gulp');
const zip = require('gulp-zip');
const rename = require('gulp-rename');
const packageJson = require('../package.json');

const generateAddonXml = require('./generate-addon-xml.js');

const { src, dest, series, parallel } = gulp;
const packageName = `${packageJson.name}-v${packageJson.version}.zip`;

const sources = [
  'build/**/*',
  'addon/**/*'
];

const packageFolder = 'package';
const webinterfaceFolder = `${packageFolder}/webinterface.${packageJson.name.toUpperCase()}`;

function copyFiles() {
  return src(sources)
    .pipe(dest(webinterfaceFolder));
}

function copyLicense() {
  return src(['LICENSE'])
    .pipe(rename('LICENSE.txt'))
    .pipe(dest(webinterfaceFolder));
}

function copyReadme() {
  return src(['README.md'])
    .pipe(dest(webinterfaceFolder));
}

function pack() {
  return src(['package/**/*'])
    .pipe(zip(packageName))
    .pipe(dest(packageFolder));
}

module.exports = series(
  parallel(copyFiles, copyLicense, copyReadme),
  generateAddonXml,
  pack
);
