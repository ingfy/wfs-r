var gulp = require('gulp');
var gutil = require("gulp-util");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');
var del = require('del');
var fs = require('fs');
var stream = require('stream');
var mocha = require('gulp-mocha');

var manifestData = require('./gulp/manifestData');
	
var config = {
	distPath: './dist',
	sourcePath: './src',
	resourcesPath: './resources',
	result: 'extension.js',
	main: 'index.ts', 
	sourceMaps: !gutil.env.production 
};

gulp.task('test', function () {
	require('typescript-require');
	
	return gulp.src(['test/**/*.ts']).pipe(mocha());
});

gulp.task('compile-js', function () {
	var bundler = browserify({basedir: config.sourcePath})
		.add(config.main)
		.plugin(tsify);
	
	return bundler.bundle()
		.pipe(source(config.result))
		.pipe(gulp.dest(config.distPath));
});

gulp.task('manifest', function () {
	return gulp.src('./manifest.json')
		.pipe(manifestData.add('./package.json'))
		.pipe(gulp.dest(config.distPath));
});

gulp.task('resources', function () {
	return gulp.src(config.resourcesPath + '/**/*').pipe(gulp.dest(config.distPath + '/resources'));
});

gulp.task('deploy', ['clean', 'manifest', 'resources', 'compile-js']);

gulp.task('clean', function () {
	return del.sync(['./dist']);
});