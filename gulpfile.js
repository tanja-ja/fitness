const { src, dest, series, watch } = require('gulp');
const concat  = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const  svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const webp = require('gulp-webp');
const scss  = require('gulp-sass')(require('sass'));
const ttf2woff2 = require('gulp-ttf2woff2');
const fileInclude = require('gulp-file-include');
const typograf = require('gulp-typograf');
const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();

let isProd = false; // dev by default

const fonts = () => {
    src('src/fonts/**.ttf')
    return src('src/fonts/**.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'))
}


const clean = () => {
    return del('dist')
}

const resources = () => {
    return src('src/resources/**')
    .pipe(dest('dist'))
}

const styles = ()=> {
    return src(['src/css/**/*.scss' ])
    // 'src/css/vendor/**/*.css'
    .pipe(gulpif(isProd, sourcemaps.init()))
    // .pipe(gulpif(isProd, concat('style.css')))
    .pipe(scss())
    .pipe(autoprefixes ({
                cascade:false,
                grid:true,
            }))
    .pipe(gulpif(isProd, cleanCSS({
                level:2
            })))
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream())
  };

  const htmlInclude = () => {
    return src(['src/*.html'])
      .pipe(fileInclude({
        prefix: '@',
        basepath: '@file'
      }))
      .pipe(typograf({
        locale: ['ru', 'en-US']
      }))
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
  }


const htmlMinify = () => {
  return src('dist/**/*.html')
   .pipe(gulpif(isProd, htmlMin({
      collapseWhitespace: true,
  })))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const svgSprites = () => {
return src('src/img/svg/**/*.svg')
.pipe(svgSprite({
mode: {
    stack: {
        sprite: '../sprite.svg'
    }
}
}))
.pipe(dest('dist/img'))
}



// const scripts = () => {
// return src(['src/js/main.js',
//      'src/js/components/**/*.js'


// ])
// .pipe(gulpif(isProd, sourcemaps.init()))
// .pipe(babel({
//     presets:['@babel/env']
// }))
// .pipe(concat('app.js'))
// .pipe(uglify({
//   toplevel: true
// }).on('error', notify.onError()))
// .pipe(gulpif(isProd, sourcemaps.write()))
// .pipe(dest('dist/js'))
// .pipe(browserSync.stream())

// }

const scripts = () => {
  return src('src/js/main.js', 'src/js/components/**/*.js' )
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: isProd ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },

    }))
    .pipe(gulpif(isProd, sourcemaps.init()))
   .pipe(uglify({
  toplevel: true
}).on('error', function (err) {
  console.error('WEBPACK ERROR', err);
  this.emit('end');
}))
    .pipe(gulpif(isProd, sourcemaps.write()))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}





const watchFiles = () => {
    browserSync.init({
    server: {
        baseDir: 'dist'
    }
})
}


const images = () => {
    return src([
       'src/img/**/*.jpg',
       'src/img/**/*.png',
       'src/img/**/*.svg',
       'src/img/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('dist/img'))

}




// const webpImages = () => {
//     return src([
//         'src/img/**/*.jpg',
//         'src/img/**/*.png',
//         'src/img/**/*.jpeg',
//      ])
//      .pipe(webp({quality: 80}))
//       .pipe(dest('dist/img'))
//   };


  watch('src/css/**/*.scss', styles)
  watch('src/partials/*.html', htmlInclude)
  watch('src/*.html', htmlInclude)
  watch('src/**/*.html', htmlMinify)
  watch('src/img/svg/**/*.svg', svgSprites)
  watch('src/img/**/**.jpg,jpeg,png,svg', images);
  watch('src/js/**/*.js', scripts)
  watch('src/resources/**', resources)
  watch('src/fonts/**.ttf', fonts)

    const toProd = (done) => {
        isProd = true;
        done();
      };

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, htmlInclude, resources, fonts, styles, svgSprites, images, scripts, watchFiles);
exports.build = series(toProd, clean, htmlInclude, resources, fonts, scripts, styles,  svgSprites, images,htmlMinify);
