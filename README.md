# bpmnlint-loader

[![Build Status](https://travis-ci.org/nikku/bpmnlint-loader.svg?branch=master)](https://travis-ci.org/nikku/bpmnlint-loader)

Consume [bpmnlint](https://github.com/bpmn-io/bpmnlint) config files with [webpack](https://webpack.js.org).

```javascript
import { Linter } from 'bpmnlint';

import linterConfig from './.bpmnlintrc';

const linter = new Linter(linterConfig);
```


## Installation

```sh
npm i bpmnlint-loader -D
```

## Usage

Configure the loader in your `webpack.config.js`.

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.bpmnlintrc$/,
        use: [
          {
            loader: 'bpmnlint-loader',
          }
        ]
      }
    ]
  }
};
```

# License

MIT