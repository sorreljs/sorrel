import {source} from '../config';
import * as del from 'del';

export function cleanOutput() {
  return del([
    `${source}/**/*.js`,
    `${source}/**/*.d.ts`,
    `${source}/**/*.js.map`,
    `${source}/**/README.md`,
    `${source}/**/LICENSE`,
    `${source}/**/.npmignore`,
    `${source}/**/`,
    'dist'
  ]);
}

export function cleanBundle() {
  return del(['node_modules/@sorrel']);
}
