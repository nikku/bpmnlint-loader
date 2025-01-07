import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  lib: [
    'index.js'
  ],
  test: [
    'test/*.js'
  ]
};

export default [

  ...bpmnIoPlugin.configs.node,

  // test
  ...bpmnIoPlugin.configs.mocha.map(config => {

    return {
      ...config,
      files: files.test
    };
  })
];