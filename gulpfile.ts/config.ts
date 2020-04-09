import {getDirs, getDirMap} from './utils/task-helper';

export const source = 'packages';

export const packagePath = getDirs(source);

export const packageMap = getDirMap(source);
