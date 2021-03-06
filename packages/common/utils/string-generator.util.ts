import {v4 as uuid} from 'uuid';
import * as hashStatic from 'object-hash';

export function randomStringGenerator() {
  return uuid();
}

export function hash(object: any, options?: any) {
  return hashStatic(object, options);
}
