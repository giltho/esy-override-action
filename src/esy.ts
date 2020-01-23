import {promisify} from 'util';
import {exec as exec_callback} from 'child_process';
import {error} from '@actions/core';

let exec = promisify(exec_callback);

export type EsyStatus = {
  rootPackageConfigPath: string;
};

export type EsyProject = {
  devDependencies: {
    ocaml: string;
  };
};

export async function status(): Promise<EsyStatus> {
  let {stdout, stderr} = await exec('esy status');
  if (stderr) {
    error(stderr);
  }
  return JSON.parse(stdout);
}

export async function build(sandbox: string | null): Promise<void> {
  let sandbox_param = sandbox ? '@' + sandbox : '';
  await exec(`esy ${sandbox_param} build`);
}
