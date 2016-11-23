/**
 * Woah, this one is ugly.
 * Basically, semantic-ui-css imports Lato fonts from Google Fonts and we don't want that.
 * This gulp task patches semantic.css which allows us to bundle the fonts.
 */

const { src, dest, series, parallel } = require('gulp');
const rename = require('gulp-rename');
const transform = require('gulp-transform');
const del = require('del');

const semanticUiPath = './node_modules/semantic-ui-css';
const semanticUiCssPath = semanticUiPath + '/semantic.css';
const semanticUiAssetsPath = semanticUiPath + '/themes/**/*';

const destPath = './src/styles';
const themesPath = destPath + '/themes'

function cleanAssets(callback) {
  del(themesPath)
    .then(() => callback())
    .catch(error => callback(error));
}

function customizeSemanticCss() {
  return src(semanticUiCssPath)
    .pipe(transform(contents => contents.replace(/@import url\(.*?\);/, '@import url("./fonts.css");'), {encoding: 'utf8'}))
    .pipe(rename('semantic.custom.css'))
    .pipe(dest(destPath));
}

function copyAssets() {
  return src(semanticUiAssetsPath)
    .pipe(dest(themesPath));
}

module.exports = series(
  cleanAssets,
  parallel(
    customizeSemanticCss,
    copyAssets
  )
);
