import { nodeResolve } from '@rollup/plugin-node-resolve'

const globals = {
  erre: 'erre'
}

export default {
  input: 'index.next.js',
  external: ['erre'],
  plugins: [
    nodeResolve()
  ],
  output: [
    {
      name: 'fromDOM',
      file: 'index.cjs',
      format: 'umd',
      globals
    },
    {
      name: 'fromDOM',
      file: 'index.js',
      format: 'es',
      globals
    }
  ]
}
