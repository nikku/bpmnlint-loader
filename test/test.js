const compiler = require('./compiler.js');

const { expect } = require('chai');


describe('bpmnlint-loader', function() {

  it('should compile', async function() {

    // when
    const { code } = await compile('./fixtures/.bpmnlintrc');

    // then
    // expect resolved bundle
    expect(code).to.match(
      /import rule_[0-9]+ from 'bpmnlint\/rules\/conditional-flows'/
    );
    expect(code).to.match(
      /cache\['bpmnlint\/conditional-flows'\] = rule_[0-9]+/
    );

    expect(code).to.match(
      /import rule_[0-9]+ from 'bpmnlint-plugin-simple\/rules\/foo'/
    );
    expect(code).to.match(
      /cache\['bpmnlint-plugin-simple\/foo'\] = rule_[0-9]+/
    );

    expect(code).to.match(
      /import rule_[0-9]+ from 'bpmnlint-plugin-external\/src\/foo'/
    );
    expect(code).to.match(
      /cache\['bpmnlint-plugin-external\/foo'\] = rule_[0-9]+/
    );
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

  const module = stats.toJson({ source: true }).modules.find(m => m.id === fixture);

  expect(module).to.exist;

  return {
    stats,
    module,
    code: module.source
  };
}