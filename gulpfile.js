const { src, dest, series } = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');

const target = 'dist';

var tsProject = typescript.createProject('tsconfig.json');

function clean() {
  return del([target]);
}

function lintTs() {
  return tsProject.src()
    .pipe(eslint())
    .pipe(eslint.format());
}

function compile() {
  const compiled = tsProject.src().pipe(tsProject());
  compiled.dts.pipe(dest(target));
  return compiled.js.pipe(dest(target));
}

function min() {
  return src(target + '/multi-select-webcomponent.js')
    .pipe(uglify())
    .pipe(rename('multi-select-webcomponent.min.js'))
    .pipe(dest(target));
}

const build = series(
  clean,
  lintTs,
  compile,
  min
);

exports.default = build;
