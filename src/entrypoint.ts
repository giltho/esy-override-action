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
    await esy.install(sandbox);
    await esy.build(sandbox);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
