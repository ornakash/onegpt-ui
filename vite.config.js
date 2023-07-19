export default {
  build: {
    outDir: 'umd',
    minify: true,
    lib: {
      entry: 'main.js',
      name: 'One Agent UI',
      fileName: 'oneagent-ui',
    },
  },
};
