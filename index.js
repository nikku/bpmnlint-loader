const compileConfig = require('bpmnlint/lib/support/compile-config');


async function bpmnlintLoader(source) {

  async function run(code) {

    const config = JSON.parse(code);

    return await compileConfig(config);
  }

  const callback = this.async();

  run(source).then(c => callback(null, c), callback);
}

module.exports = bpmnlintLoader;