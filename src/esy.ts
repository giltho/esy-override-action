import { promisify } from 'util';
import { exec as exec_callback } from 'child_process';

let exec = promisify(exec_callback);

export type EsyStatus = {
  rootPackageConfigPath: string
}

export type EsyProject = {
  devDependencies: {
    "ocaml": string
  }
}

export async function status() : Promise<EsyStatus> {
  let { stdout } = await exec('esy status');
  return JSON.parse(stdout);
}

export async function build(sandbox : string | null) : Promise<void> {
  let sandbox_param = sandbox ? "@" + sandbox : "";
  await exec(`esy ${sandbox_param} build`);
}