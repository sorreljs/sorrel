import {packageMap} from '../config';
import {createProject, Project} from 'gulp-typescript';
import {dest, watch} from 'gulp';
import {init, write} from 'gulp-sourcemaps';

interface PackageOptions {
  [key: string]: Options;
}

interface Options {
  path: string;
  tsProject: Project;
}

export const packageOptions = getPackages();

export function factory(packageName: string, isDev: boolean) {
  const options = packageOptions[packageName];
  const {path, tsProject} = options;
  return isDev
    ? createDevTask(tsProject, packageName, path)
    : createTask(tsProject, packageName, path);
}

function createDevTask(tsProject: Project, packageName: string, path: string) {
  const task = () =>
    tsProject
      .src()
      .pipe(init())
      .pipe(tsProject())
      .pipe(write('.'))
      .pipe(dest(`node_modules/@sorrel/${packageName}`));
  Object.assign(task, {displayName: `${packageName}:dev`});
  watch(`${path}/**/*.ts`, task);
  return task;
}

function createTask(tsProject: Project, packageName: string, path: string) {
  const task = () => tsProject.src().pipe(tsProject()).pipe(dest(path));
  Object.assign(task, {displayName: packageName});
  return task;
}

function getPackages() {
  const packages: PackageOptions = {};
  const modules = Object.keys(packageMap);
  modules.forEach(packageName => {
    const options: Options = {
      path: packageMap[packageName],
      tsProject: createProject(`${packageMap[packageName]}/tsconfig.json`)
    };
    packages[packageName] = options;
  });
  return packages;
}
