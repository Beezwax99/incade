var gulp = require('gulp');
var rigger = require('gulp-rigger');
var rimraf = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-clean-css');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');


var browserSync = require("browser-sync");
var reload = browserSync.reload;

var autoprefixer = require('gulp-autoprefixer');

var gulp = require('gulp');
 

var path = {
  build: { // Тут мы укажем куда складывать готовые после сборки файлы
      html: 'build/',
      js: 'build/js/',
      css: 'build/css/',
      img: 'build/images/',
      fonts: 'build/fonts/'
  },
  src: { // Пути откуда брать исходники
      html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
      js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
      vendors: 'src/js/vendors/*.js',
      style: 'src/styles/main.scss',
      img: 'src/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
      svg: "src/svg/*.svg",
      fonts: 'src/fonts/**/*.*'
  },
  watch: { // Тут мы укажем, за изменением каких файлов мы хотим наблюдать
      html: 'src/**/*.html',
      js: 'src/js/**/*.js',
      style: 'src/styles/**/*.scss',
      img: 'src/images/**/*.*',
      svg: "src/svg/*.svg",
      fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};  

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};

gulp.task('html:build', function () {
  return gulp.src(path.src.html) // Выберем файлы по нужному пути
              .pipe(rigger()) // Прогоним через rigger
              .pipe(gulp.dest(path.build.html)) // Выплюнем их в папку build
              .pipe(reload({stream: true})) // И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js) // Найдем наш main файл
          .pipe(rigger()) // Прогоним через rigger
          .pipe(sourcemaps.init()) // Инициализируем sourcemap
          .pipe(uglify()) // Сожмем наш js
          .pipe(sourcemaps.write()) // Пропишем карты
          .pipe(gulp.dest(path.build.js)) // Выплюнем готовый файл в build
          .pipe(reload({ stream: true })); // И перезагрузим сервер
});
gulp.task('vendors:build', function() {
  return gulp.src(path.src.vendors) // Найдем наш main файл
  .pipe(gulp.dest(path.build.js)) // Выплюнем готовый файл в build
})

gulp.task('style:build', function () {
  return gulp.src(path.src.style) // Выберем наш main.scss
          .pipe(rigger()) // Прогоним через rigger
          .pipe(sourcemaps.init()) // То же самое что и с js
          .pipe(sass()) // Скомпилируем
          .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions'],
            cascade: false
          }))
          // .pipe(prefixer()) //Добавим вендорные префиксы
          .pipe(cssmin()) // Сожмем
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(path.build.css)) // И в build
          .pipe(reload({ stream: true }));
});

gulp.task('fonts:build', function() {
  return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
});

gulp.task('image:build', function () {
  return gulp.src(path.src.img) //Выберем наши картинки
          // .pipe(imagemin({ // Сожмем их
          //   progressive: true,
          //   svgoPlugins: [{ removeViewBox: false }],
          //   use: [pngquant()],
          //   interlaced: true
          // }))
          .pipe(gulp.dest(path.build.img)) // И бросим в build
          .pipe(reload({stream: true}));
});


gulp.task('svg:build', function () {
  return gulp.src(path.src.svg)
      .pipe(svgmin({
          js2svg: {
              pretty: true
          }
      }))
      .pipe(cheerio({
          run: function ($) {
              $('[fill]').removeAttr('fill');
              $('[stroke]').removeAttr('stroke');
              $('[style]').removeAttr('style');
          },
          parserOptions: { xmlMode: true }
      }))
      .pipe(replace('<symbol viewbox', '<symbol fill="currentColor" viewbox'))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
          mode: {
              symbol: {
                  sprite: "../sprite.svg"
              }
          }
      }))
      .pipe(gulp.dest(path.build.img));
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('build', gulp.series([
  'html:build',
  'js:build',
  'vendors:build',
  'style:build',
  'fonts:build',
  'image:build',
  'svg:build',

]))

gulp.task('watch', function() {
  watch([path.watch.html], gulp.series(['html:build'])),
  watch([path.watch.style],gulp.series(['style:build'])),
  watch([path.watch.js], gulp.series(['js:build', 'vendors:build']));
});

gulp.task('default', gulp.parallel(
    gulp.series(['clean', 'build', 'webserver']),
    gulp.series(['watch']),
  )
);

