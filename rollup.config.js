import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'index.next.js',
  name: 'merge',
  external: ['erre'],
  globals: {
    erre: 'erre'
  },
  plugins: [
    resolve({
      jsnext: true
    })
  ],
  output: [
    {
      file: 'erre.fromDOM.js',
      format: 'umd'
    }
  ]
}