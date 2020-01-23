import { status, EsyProject } from './esy';
import * as core from '@actions/core';
import path from 'path';
import { cwd } from 'process';
import { promises as fs } from 'fs';

export async function version(version: string | null, sandbox: string | null) : Promise<void> {
  if (version) {
    let sandbox_path: string = "";
    if (!sandbox) {
      let current_status = await status();
      sandbox_path = current_status.rootPackageConfigPath;
    } else {
      sandbox_path = path.join(cwd(), sandbox + ".json");
    }

    let raw_data = await fs.readFile(sandbox_path, "utf8");
    let project : EsyProject = JSON.parse(raw_data);
    project.devDependencies.ocaml = version;
    await fs.writeFile(sandbox_path, JSON.stringify(project))
  } 
}