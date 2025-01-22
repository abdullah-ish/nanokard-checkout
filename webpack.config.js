const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './public/embed.js',
  output: {
    filename: 'widget.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'CheckoutWidget',
    libraryTarget: 'umd',
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
        },
        output: {
          comments: false,
        },
      },
      extractComments: false,
    })],
  },
};
