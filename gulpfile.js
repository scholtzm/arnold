const gulp = require('gulp');
const { task, series } = gulp;

const make = require('./tasks/make.js');
const pack = require('./tasks/pack.js');
const clean = require('./tasks/clean.js');

task('default', make);
task('pack', series(clean, pack));
task('clean', clean);
