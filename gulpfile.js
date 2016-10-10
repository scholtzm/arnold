const gulp = require('gulp');
const { task, series } = gulp;

const pack = require('./tasks/pack.js');
const clean = require('./tasks/clean.js');

task('default', series(clean, pack));
task('clean', clean);
