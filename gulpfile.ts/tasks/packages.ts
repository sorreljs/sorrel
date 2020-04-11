import {packageOptions, factory} from '../utils/task-helper';
import {parallel, series} from 'gulp';
import {cleanBundle} from './clean';
import {watchFile} from './watch';

export const buildPackage = parallel(buildPackageHandle(false));

export const buildPackageDev = series(
  cleanBundle,
  ...buildPackageHandle(),
  parallel(watchFile)
);

function buildPackageHandle(isDev = true) {
  const module = Object.keys(packageOptions);
  return module.map(packageName => factory(packageName, isDev));
}
