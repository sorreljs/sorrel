import {getDirs} from './utils/helper';

export const source = 'packages';

export const packagePath = getDirs(source);

export const packageMap: {[key: string]: string} = {
  common: 'packages/common',
  core: 'packages/core'
};
