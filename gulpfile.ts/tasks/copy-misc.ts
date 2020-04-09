import {src, dest} from 'gulp';
import {packagePath} from '../config';

export function copyMisc() {
  const miscFiles = src(['README.md', 'LICENSE', '.npmignore']);
  return packagePath.reduce(
    (stream, packagePath) => stream.pipe(dest(packagePath)),
    miscFiles
  );
}
