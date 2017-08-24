
import angular from 'rollup-plugin-angular';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

// rollup-plugin-angular addons
import sass from 'node-sass';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier';

const cssmin = new CleanCSS();
const htmlminOpts = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true,
};

export default {
  input: 'dist/index.js',
  output: {
    // core output options
    file: 'dist/bundle.umd.js',    // required
    format: 'umd',  // required
    name: 'ngx-markdown.core',

    // advanced output options
    // paths: ,
    // banner: ,
    // footer: ,
    // intro:,
    // outro: ,
    sourcemap: true, // true | inline
    // sourcemapFile: ,
    // interop: ,

    // danger zone
    exports: 'named',
    // amd: ,
    // indent: , 
    // strict: 
  },
  onwarn,
  plugins: [
    angular({
      preprocessors: {
        template: template => minifyHtml(template, htmlminOpts),
        style: scss => {
          const css = sass.renderSync({ data: scss }).css;
          return cssmin.minify(css).styles;
        },
      }
    }),
    buble(),
    commonjs(),
    nodeResolve({
      // use "module" field for ES6 module if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      browser: true,  // Default: false

      // not all files you want to resolve are .js files
      extensions: [ '.js', '.json' ],  // Default: ['.js']

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      preferBuiltins: true,  // Default: true

      // Lock the module search in this path (like a chroot). Module defined
      // outside this path will be mark has external
      jail: '/', // Default: '/'

      // If true, inspect resolved files to check that they are
      // ES2015 modules
      modulesOnly: false, // Default: false

      // Any additional options that should be passed through
      // to node-resolve
      customResolveOptions: {}
    }),
    typescript({
      typescript: require('./node_modules/typescript')
    }),
    uglify({}, minify)
  ]
};

function onwarn(message) {
  const suppressed = [
    'UNRESOLVED_IMPORT',
    'THIS_IS_UNDEFINED'
  ];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}
