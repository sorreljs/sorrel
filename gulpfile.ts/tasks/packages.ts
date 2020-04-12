import {packageOptions, factory} from '../utils/task-helper';
import {series} from 'gulp';
import {cleanBundle} from './clean';

export const buildPackage = series(buildPackageHandle(false));

export const buildPackageDev = series(cleanBundle, ...buildPackageHandle());

function buildPackageHandle(isDev = true) {
  const module = Object.keys(packageOptions);
  return module.map(packageName => factory(packageName, isDev));
}
