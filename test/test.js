import compiler from './compiler';

import { expect } from 'chai';


describe('bpmnlint-loader', function() {

  it('should compile', async function() {

    // when
    const { code } = await compile('./fixtures/.bpmnlintrc');

    // then
    // expect resolved bundle
    expect(code).to.contain('import rule_0 from \'bpmnlint/rules/conditional-flows\'');
    expect(code).to.contain('cache[\'bpmnlint/conditional-flows\'] = rule_0');
  });


  it('should fail with error', async function() {

    let err;

    try {
      await compile('./fixtures/bpmnlint-config-error.json');
    } catch (e) {
      err = e;
    }

    // then
    expect(err).to.exist;
    expect(err.message).to.eql('bundle build error');
  });

});



// helper ////////////////////

async function compile(fixture) {

  const stats = await compiler(fixture);

  const module = stats.toJson().modules.find(m => m.id === fixture);

  expect(module).to.exist;

  return {
    stats,
    module,
    code: module.source
  };
}