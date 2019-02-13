// /////////////////////////////////////////////////
// REQUIRED
// ////////////////////////////////////////////////

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var htmlreplace = require('gulp-html-replace');
var babel = require('gulp-babel');
var sequence = require('gulp-sequence');

var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// var workbox = require('workbox-build');

// /////////////////////////////////////////////////
// TASK PARTAMETTERS
// ////////////////////////////////////////////////

var config = {
  buildFilesFoldersRemove:[
  'build/scss/', 
  'build/js/!(*.min.js)',
  'build/bower.json',
  'build/bower_components/',
  'build/images-not-procesed/',
  'build/css/',
  'build/**/*.html'
  ]
};

// /////////////////////////////////////////////////
// SASS TASK
// ////////////////////////////////////////////////

// la tare compila todo el sass y genera los aerchivos map de referencia para los msmos
gulp.task('styles', function(){
  gulp.src([
   //  'node_modules/bootstrap/scss/bootstrap.scss',
   // 'node_modules/font-awesome/scss/font-awesome.scss',
   'app/scss/*.scss'
   ])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({errorLogConsole:true}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('app/css'))
  .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// SCRIPTS TASK
// ////////////////////////////////////////////////

// la tarea minifica y concatena los archivos del usuario
gulp.task('scripts', function(){
  gulp.src(['app/js/*.js', '!app/js/**/*min.js'])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(concat('all.js'))
  .pipe(rename({suffix:".min"}))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('app/js'))
  .pipe(reload({stream:true}));
});

// la tare minifica y concatena los archivos base tipo librerias
gulp.task('structure:scripts', function(){
  gulp.src([
    // './node_modules/jquery/dist/jquery.js', 
    // './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ])
  .pipe(concat('main-structure.js'))
  .pipe(rename({suffix:".min"}))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
  .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// IMAGEMIN TASK
// //////////////////////////////////////////////// 

// La tarea miniifca la imagenes (gif, jpg, png, svg);
gulp.task('imageMin', function(){
  gulp.src('app/images-not-procesed/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
      {removeViewBox: true},
      {cleanupIDs: false}
      ]
    })
    ]))
  .pipe(gulp.dest('app/images'))
  .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// HTML TASK
// ////////////////////////////////////////////////  

// la tarea permite que broweser syn recargue los HTML en caso de cambos usando el watch
gulp.task('html', function(){
  gulp.src('app/**/*.html')
  .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// FONT AWEZOME TASK
// //////////////////////////////////////////////// 

// La tare traspasa las fuentes al paquete de destino.
// gulp.task('awesome-font', function(){
//   gulp.src('node_modules/font-awesome/fonts/**/*')
//   .pipe(gulp.dest('app/fonts'))
// });

// /////////////////////////////////////////////////
// BUILD TASK
// //////////////////////////////////////////////// 

// Tarea para remover todos los archivos y carpetas innecesarias del directorio build
gulp.task('build:cleanfolder', function () {
  del([
    'build/**'
    ]);
});

// Tarea para crear el directorio para todos los archivos. , ['build:cleanfolder']
gulp.task('build:copy', function(){
  return gulp.src('app/**/*/')
  .pipe(gulp.dest('build/'));
});

// Tarea para remover todos los archivos no deseados del build
// Enumere aqui todos los archivos que no desea incluir en el build , ['build:copy']
gulp.task('build:remove', function () {
  del(config.buildFilesFoldersRemove);
});

// html replace modifica los parametros de link css en las plantillas html para poder usar con archivos mnificados
gulp.task('build:html', function() {
  gulp.src('app/**/*.html')
  .pipe(htmlreplace({
    'css': [
    // 'css/bootstrap.min.css',
    // 'css/font-awesome.min.css',
    'css/style.min.css'
    ]
  }))
  .pipe(gulp.dest('build/'));
});

// build Styles genero los archivos minificados para los css desde 0 remueve el map pero usa auto prefixer minify y inluye la extencion
gulp.task('build:styles', function(){
  gulp.src([
    // 'node_modules/bootstrap/scss/bootstrap.scss',
    // 'node_modules/font-awesome/scss/font-awesome.scss',
    'app/scss/**/*.scss'])
  .pipe(plumber())
  .pipe(sass({errorLogConsole:true}))
  .pipe(prefixer('last 2 versions'))
  .pipe(cssmin())
  .pipe(rename({suffix:".min"}))
  .pipe(gulp.dest('build/css'))
  .pipe(reload({stream:true}));
});

// gulp.task('service-worker', () => {
//   return workboxBuild.injectManifest({
//     swSrc: 'build/sw.js',
//     swDest: 'app/sw.js',
//     globDirectory: 'build',
//     globPatterns: [
//       '**\/*.{js,css,jpg,png,svg,gif}',
//     ]
//   }).then(({count, size, warnings}) => {
//     // Optionally, log any warnings and details.
//     warnings.forEach(console.warn);
//     console.log(`${count} files will be precached, totaling ${size} bytes.`);
//   });
// });

// service worker

// gulp.task('generate-service-worker', () => {
//   setTimeout(() =>{
//   return workbox.generateSW({
//     globDirectory: 'build',
//     globPatterns: [
//       '**/*.{html,js,css,jpg,png,gif,svg}'
//     ],
//     swDest: 'build/sw.js',
//     clientsClaim: true,
//     skipWaiting: true
//   }).then(({warnings}) => {
//     // In case there are any warnings from workbox-build, log them.
//     for (const warning of warnings) {
//       console.warn(warning);
//     }
//     console.info('Service worker generation completed.');
//   }).catch((error) => {
//     console.warn('Service worker generation failed:', error);
//   });
// },10000);
// });

// Default build task
gulp.task('build', sequence(['build:cleanfolder'], ['build:copy'], ['build:remove'], ['build:html', 'build:styles'],));

// gulp.task('build:secondarySequence', sequence(['generate-service-worker']));

// gulp.task('build', function(cb) { sequence(['build:initialSequence'], ['build:secondarySequence'], cb)});


// /////////////////////////////////////////////////
// BROWSER SYNC TASK
// ////////////////////////////////////////////////

// browser sync for app folder
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir:"./app/"
    }
  });
});

// browser sync for build folder
gulp.task('build:serve', function(){
  browserSync({
    server:{
      baseDir:"./build/"
    }
  });
});

// /////////////////////////////////////////////////
// WATCH TASK
// ////////////////////////////////////////////////

gulp.task('watch', function(){
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/scss/**/*.scss', ['styles']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/images-not-procesed/*', ['imageMin']);
});

// /////////////////////////////////////////////////
// DEFAULT TASK
// ////////////////////////////////////////////////

gulp.task('default', 
  ['styles', 
  'scripts', 
  // 'structure:scripts',
  'imageMin',
  'html',
  // 'awesome-font',
  'browser-sync', 
  'watch']);


