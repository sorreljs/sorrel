import {readdirSync, statSync} from 'fs';
import {join} from 'path';

export function getFolders(dir: string) {
  return readdirSync(dir).filter(file => isDirectory(join(dir, file)));
}

export function getDirs(base: string) {
  return getFolders(base).map(path => `${base}/${path}`);
}

export function getDirMap(base: string) {
  const map: {[key: string]: string} = {};
  getFolders(base).map(path => map[path] = `${base}/${path}`);
  return map;
}

function isDirectory(path: string) {
  return statSync(path).isDirectory();
}
