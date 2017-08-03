import angular from 'rollup-plugin-angular';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve-angular';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  entry: 'dist/index.js',
  dest: 'dist/bundle.umd.js',
  exports: 'named',
  sourceMap: false,
  format: 'umd',
  moduleName: '@ngx-markdown/core',
  onwarn,
  plugins: [
    angular(),
    commonjs(),
    nodeResolve({
      // use "es2015" field for ES2015 modules with ES2015 code,
	  // if possible
      es2015: true, // Default: false

      // use "module" field for ES2015 modules with ES5 code,
	  // if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // if there's something your bundle requires that you DON'T
      // want to include, add it to 'skip'. Local and relative imports
      // can be skipped by giving the full filepath. E.g.,
      // `path.resolve('src/relative-dependency.js')`
      skip: [ 'some-big-dependency' ],  // Default: []

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      browser: true,  // Default: false

      // not all files you want to resolve are .js files
      extensions: [ '.js', '.json' ],  // Default: ['.js']

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      preferBuiltins: false  // Default: true
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
