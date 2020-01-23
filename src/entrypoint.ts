import * as core from '@actions/core';
import * as esy from './esy';
import * as override from './override';

async function run() {
  try {
    let sandbox = core.getInput('sandbox');
    let version = core.getInput('ocaml-version');
    console.log('Running with :');
    console.log('  Sandbox : ', sandbox);
    console.log('  Version : ', version);
    await override.version(version, sandbox);
    console.log('Running esy install...');
    await esy.install(sandbox);
    console.log('Running esy build...');
    await esy.build(sandbox);
    console.log('All Done !!!!');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
