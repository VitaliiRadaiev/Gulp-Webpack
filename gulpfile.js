const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync');

const paths = {
	root: './dist',
	templates: {
		pages: 'src/views/pages/*.pug',
		src: 'src/views/**/*.pug',
		dest: 'dist/'
	},
	scripts: {
		src: './src/assets/scripts/*.js',
		dest: './dist/assets/scripts/'
	}
}

gulp.task('scss', function() {
	return gulp.src('src/assets/styles/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest('dist/css'))
});

gulp.task('scripts', function() {
	return gulp.src('src/assets/scripts/**/*.js')
		.pipe(gulpWebpack(webpackConfig, webpack))
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    browserSync.watch('./dist/**/*.*', browserSync.reload);
}); 

gulp.task('watch', function() {
	gulp.watch('src/assets/styles/**/*.scss', gulp.parallel('scss'))
	gulp.watch('src/assets/scripts/index.js', gulp.parallel('scripts'))

});

gulp.task('default', gulp.parallel('browser-sync','watch'))