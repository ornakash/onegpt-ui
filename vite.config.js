export default {
    build: {
      outDir: 'umd',
      minify: true,
      lib: {
        entry: 'main.js',
        name: 'MyLibrary',
        fileName: 'my-library',
      },
    },
  };
  