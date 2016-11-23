const gulp = require('gulp');
const { task, series } = gulp;

const make = require('./tasks/make.js');
const pack = require('./tasks/pack.js');
const clean = require('./tasks/clean.js');
const customizeSemantic = require('./tasks/customize-semantic.js');

task('default', series(clean, make));
task('pack', series(clean, pack));
task('clean', clean);
task('customize-semantic', customizeSemantic);
