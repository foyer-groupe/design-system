// ------------------------------------------------------------------------------------------------------------------ //
//          DEV TASKS MANAGER
// ------------------------------------------------------------------------------------------------------------------ //
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const swig = require('gulp-swig');
const del = require('del');

gulp.task('default', function (done) {

	// Data used in html files
	let swigData = {
		path_img: 'img/'	// path to output images folder to be used in the static website
	};

	return del(['public/']).then(function () { // delete the public/ folder

		return [

			// Compile HTML files
			gulp.src([
				'src/*.html'
			]).pipe(swig({ data: swigData }))
				.pipe(gulp.dest('public/')),

			// Compile CSS files
			gulp.src('src/scss/main.scss')
				.pipe(sass())
				.pipe(autoprefixer())
				.pipe(csso())
				.pipe(gulp.dest('public/css/')),

			// Compile JS files
			gulp.src([
				'src/js/*.js'
			]).pipe(concat('main.js'))
				.pipe(gulp.dest('public/js/')),

			// Compile vendor JS files
			gulp.src([
				'node_modules/jquery/dist/jquery.min.js',
				'node_modules/highlightjs/highlight.pack.js'
			]).pipe(concat('vendor.js'))
				.pipe(gulp.dest('public/js/')),

			// Compile vendor CSS files
			gulp.src([
				'node_modules/flexboxgrid/dist/flexboxgrid.css',
				'node_modules/highlightjs/styles/github-gist.css'
			]).pipe(concat('vendor.css'))
				.pipe(gulp.dest('public/css/')),

			// Copy image files
			gulp.src([
				'src/img/*'
			]).pipe(gulp.dest('public/img/')),

			// Copy font files
			gulp.src([
				'src/fonts/*'
			]).pipe(gulp.dest('public/fonts/')),
		];

	});

	done();
});