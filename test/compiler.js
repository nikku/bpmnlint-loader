const path = require('path');

const webpack = require('webpack');
const memoryfs = require('memory-fs');


module.exports = function compiler(fixture, options = {}) {
  const compiler = webpack({
    mode: 'development',
    context: __dirname,
    entry: fixture,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [ {
        test: /\.(bpmnlintrc|json)$/,
        use: {
          loader: path.resolve(__dirname, '../index.js')
        }
      } ]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {

      if (stats.hasErrors()) {
        err = err || new Error('bundle build error');
      }

      if (err) {
        err.stats = stats;

        return reject(err);
      }

      resolve(stats);
    });
  });
};