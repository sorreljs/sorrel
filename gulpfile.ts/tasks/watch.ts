import {watch} from 'gulp';
import {packageOptions, factory} from '../utils/task-helper';

export const watchFile = watchFileHandle();

function watchFileHandle() {
  const modules = Object.keys(packageOptions);
  return modules.map(packageName => {
    const options = packageOptions[packageName];
    const {path} = options;
    return createWatchTask(path, packageName, factory(packageName, true));
  });
}

function createWatchTask(
  path: string,
  packageName: string,
  task?: () => NodeJS.ReadWriteStream
) {
  const watchTask = () => watch(`${path}/**/*.ts`, task);
  Object.assign(watchTask, {displayName: `${packageName}:watch`});
  return watchTask;
}
