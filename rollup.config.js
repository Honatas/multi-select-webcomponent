import del from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/multi-select-webcomponent.ts',
  output: [{
  //   file: 'dist/multi-select-webcomponent.cjs.js',
  //   format: 'cjs'
  // }, {
  //   file: 'dist/multi-select-webcomponent.esm.js',
  //   format: 'esm'
  // }, {
    file: 'dist/multi-select-webcomponent.js',
    format: 'iife',
    name: 'MultiselectWebcomponent'
  }, {
    file: 'dist/multi-select-webcomponent.min.js',
    format: 'iife',
    name: 'MultiselectWebcomponent',
    plugins: [
      terser()
    ]
  }],
  plugins: [
    del({ targets: 'dist/*' }),
    typescript()
  ]
}
