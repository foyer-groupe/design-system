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
const ghPages = require('gh-pages');
const path = require('path');

gulp.task('default', function (done) {

	// Data used in html files
	let swigData = {
		path_img: 'img/'	// path to output images folder to be used in the static website
	};

	return del(['public/']).then(function () { // delete the public/ folder

		return [

			// Compile HTML files
			gulp.src([
				'src/*.html',
			]).pipe(swig({ data: swigData }))
				.pipe(gulp.dest('public/')),

			// Move some other files
			gulp.src([
				'CNAME',
				'src/*.js',
				'src/*.json'
			]).pipe(gulp.dest('public/')),

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
				'node_modules/highlightjs/highlight.pack.min.js'
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
				'src/img/*',
				'src/img/*/*'
			]).pipe(gulp.dest('public/img/')),

			// Copy font files
			gulp.src([
				'src/fonts/*'
			]).pipe(gulp.dest('public/fonts/')),
		];

	});

	done();
});

gulp.task('publish-documentation', function (done) {
    // Publish documentation in branch gh_pages
    ghPages.publish(
    	path.resolve('public'),
{
			message: 'Documentation updated'
		}, (err) => {
        if (err) {
            console.error(err);
        }
        done(err);
    });
});
