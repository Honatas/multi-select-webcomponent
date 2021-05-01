const { src, dest, series } = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const rename = require('gulp-rename');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');

const target = 'dist';
const tsProject = typescript.createProject('tsconfig.json');

function clean() {
  return del('dist');
}

function ts() {
  const compiled = tsProject.src().pipe(tsProject());
  compiled.dts.pipe(dest(target));
  return compiled.js
    .pipe(concat('multi-select-webcomponent.js'))
    .pipe(dest(target));
}

function min() {
  return src(target + '/multi-select-webcomponent.js')
    .pipe(uglify())
    .pipe(rename('multi-select-webcomponent.min.js'))
    .pipe(dest(target));
}

const build = series(
  clean,
  ts,
  min,
);

exports.default = build;
