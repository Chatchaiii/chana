module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.(jpeg|jpg|mov)$/,
        use: 'file-loader',
      },
    ],
  },
};