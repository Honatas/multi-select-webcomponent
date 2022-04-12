import typescript from 'rollup-plugin-typescript2';
import terser from 'rollup-plugin-terser';

export default {
  input: 'src/multi-select-webcomponent.ts',
  output: [{
    file: 'dist/multi-select-webcomponent.js',
    format: 'umd',
    name: 'MultiselectWebcomponent'
  }, {
    file: 'dist/multi-select-webcomponent.min.js',
    format: 'umd',
    name: 'MultiselectWebcomponent',
    plugins: [
      terser.terser(),  
    ],
  }],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist'
    }),
  ],
}
