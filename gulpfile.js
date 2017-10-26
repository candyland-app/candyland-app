'use strict';
const del = require('del');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const changed = require('gulp-changed');
const cssnano = require('gulp-cssnano');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');

gulp.task('browserSync', () => {
	// Initialize server
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('sass', () => {
	// Compile SASS to CSS
	return gulp.src('app/scss/**/*.scss')
	.pipe(changed('app/css', {extension: '.css'}))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('watch', () => {
	// Keep watching the following directories
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('useref', () => {
	// Minify & unify JS/CSS
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist'));
});

gulp.task('fonts', () => {
	// Get Roboto
	return gulp.src('node_modules/materialize-css/dist/fonts/roboto/**/*')
	.pipe(gulp.dest('app/fonts/roboto'))
	.pipe(changed('dist/fonts/roboio'))
	.pipe(gulp.dest('dist/fonts/roboto'));
});

gulp.task('js-assets', () => {
	// Get materialize js assets
	return gulp.src('node_modules/materialize-css/dist/js/**/*.js')
	.pipe(changed('app/assets/js'))
	.pipe(gulp.dest('app/assets/js'));
});

gulp.task('sass-assets', () => {
	// Get materialize sass modules
	return gulp.src('node_modules/materialize-css/sass/components/**/*.scss')
	.pipe(changed('app/assets/components'))
	.pipe(gulp.dest('app/assets/components'));
});

gulp.task('clean', () => {
	// Delete compiled directories
	return del(['dist', 'app/fonts', 'app/assets', 'app/css']).then(paths => {
		console.log('\nFollowing directories were deleted:\n', paths.join('\n'));
	});
});

gulp.task('start', callback => {
	// Start server
	runSequence(
		'sass-assets',
		'js-assets',
		'fonts',
		['sass', 'browserSync'], 'watch',
		callback
	);
});

gulp.task('build', callback => {
	// Build Candyland
	runSequence(
		'sass-assets',
		'js-assets',
		'sass',
		['useref', 'fonts'],
		callback
	);
});
