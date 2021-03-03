# bpmnlint-loader

[![CI](https://github.com/nikku/bpmnlint-loader/workflows/CI/badge.svg)](https://github.com/nikku/bpmnlint-loader/actions?query=workflow%3ACI)

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

This will ensure that [bpmnlint configuration files](https://github.com/bpmn-io/bpmnlint#configuration) can be consumed by your build.

# License

MIT
