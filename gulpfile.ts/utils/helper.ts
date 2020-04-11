import {readdirSync, statSync} from 'fs';
import {join} from 'path';

export function getFolders(dir: string) {
  return readdirSync(dir).filter(file => isDirectory(join(dir, file)));
}

export function getDirs(base: string) {
  return getFolders(base).map(path => `${base}/${path}`);
}

function isDirectory(path: string) {
  return statSync(path).isDirectory();
}
