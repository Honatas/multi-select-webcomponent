import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/multi-select-webcomponent.ts',
  output: [{
    file: 'dist/multi-select-webcomponent.cjs.js',
    format: 'cjs'
  }, {
    file: 'dist/multi-select-webcomponent.esm.js',
    format: 'esm'
  }, {
    file: 'dist/multi-select-webcomponent.js',
    format: 'umd',
    name: 'MultiselectWebcomponent'
  }],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist'
    })
  ]
}
