const path = require('path');

module.exports = {
  entry: {
    share: { import: './src/share.js', filename: '[name].js'},
    add: { import: './src/add.js', filename: '[name].js'},
  },
  mode: 'production'
};
