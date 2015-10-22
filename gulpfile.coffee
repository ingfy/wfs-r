gulp = require 'gulp'
gutil = require 'gulp-util'
source = require 'vinyl-source-stream'
browserify = require 'browserify'
tsify = require 'tsify'
del = require 'del'
fs = require 'fs'
stream = require 'stream'
mocha = require 'gulp-mocha' 
zip = require 'gulp-zip'
jsonMerge = require './gulp/gulp-jsonMerge'
	
config =
	paths:
		build: './build'
		dist: './dist'
		resources: './resources'
		source: './src'
		tests: './test'
	files:
		eventPageScript: 'eventPage.js'
		mainIn: 'index.ts'
		packageJson: 'package.json'
		manifest: 'manifest.json'
	sourceMaps: !gutil.env.production


gulp.task 'default', ['test', 'build']
gulp.task 'deploy', ['test', 'build', 'zip']
gulp.task 'build', ['clean', 'manifest', 'resources', 'js']

gulp.task 'zip', ['build'], () -> 
	manifest = require (config.paths.build + '/' + config.files.manifest)
	packageName = "#{manifest.name} v#{manifest.version}"
	packageFileName = "#{packageName}.zip"
	mapFileName = "#{packageName}-maps.zip"
	
	gulp.src [config.paths.build + '/**', '!' + config.paths.build + '/**/*.map']
		.pipe zip packageFileName
		.pipe gulp.dest config.paths.dist

gulp.task 'test', () ->
	require 'typescript-require'
	
	gulp.src [config.paths.tests + '/**/*.ts'], {read: false}
		.pipe mocha()

gulp.task 'js', () ->
	bundler = browserify {basedir: config.paths.source}
		.add config.files.mainIn
		.plugin tsify
	
	bundler.bundle()
		.pipe source ('./' + config.files.eventPageScript)
		.pipe gulp.dest config.paths.build

project = (source, mapping) ->
	Object
		.keys mapping
		.reduce (target, key) ->
				target[key] = source[mapping[key]]		
				target 
			, {}

gulp.task 'manifest', () ->
	gulp.src config.files.manifest
		.pipe jsonMerge {
			background:
				scripts: [config.files.eventPageScript]
		}
		.pipe jsonMerge project require('./' + config.files.packageJson), {
			'description': 'description'
			'name': 'name'
			'version': 'version'
		}
		.pipe gulp.dest(config.paths.build)

gulp.task 'resources', () ->
	gulp.src (config.paths.resources + '/**/*')
		.pipe gulp.dest (config.paths.build + '/' + config.paths.resources)

gulp.task 'clean-build', () ->
	del.sync [config.paths.build]

gulp.task 'clean-dist', () ->
	del.sync [config.paths.dist]
	
gulp.task 'clean', ['clean-build', 'clean-dist']