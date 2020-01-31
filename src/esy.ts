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

async function esy(
  sandbox: string | null,
  command: string | undefined | null
): Promise<void> {
  let cmd = `esy${sandbox ? ' @' + sandbox : ''}${
    command ? ' ' + command : ''
  }`;
  await exec(cmd);
}

export async function status(): Promise<EsyStatus> {
  let {stdout, stderr} = await exec('esy status');
  if (stderr) {
    error(stderr);
  }
  return JSON.parse(stdout);
}
