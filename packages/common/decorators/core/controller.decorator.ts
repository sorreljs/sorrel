import {PATH_METADATA} from 'constants';

export function Controller(path = ''): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
}

if ('node' in globalThis) {
}
