import angular from 'rollup-plugin-angular';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es'; // (uglify plugin) Error: Error transforming bundle with 'uglify' plugin: Unexpected character '`'

export default {
  entry: 'dist/index.js',
  dest: 'dist/bundle.umd.js',
  exports: 'named', // – suitable if you're exporting more than one thing
  sourceMap: true,
  format: 'umd', // – Universal Module Definition, works as amd, cjs and iife all in one
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

      extensions: ['.js', '.json'],
      
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
      customResolveOptions: { }
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
