import {createProject, Project} from 'gulp-typescript';
import {packageMap} from '../config';
import {dest, parallel} from 'gulp';

const modules = Object.keys(packageMap);

const packages = getPackages();

export const buildPackage = parallel(buildPackageHandle());

function buildPackageHandle() {
  return modules.map(packageName => factory(packageName));
}

function factory(packageName: string) {
  const task = () => packages[packageName]
    .src()
    .pipe(packages[packageName]())
    .pipe(dest(packageMap[packageName]));

  Object.assign(task, {displayName: packageName});
  return task;
}

function getPackages() {
  const packages: {[key: string]: Project} = {};
  modules.forEach(packageName => {
    packages[packageName] = createProject(`${packageMap[packageName]}/tsconfig.json`);
  });
  return packages;
}
