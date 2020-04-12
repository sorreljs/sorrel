import {PATH_METADATA, HOST_METADATA} from '../../constants';
import {isUndefined, isString} from 'utils';

export interface ControllerOptions {
  path?: string;
  host?: string;
}

export function Controller(
  prefixOrOptions?: string | ControllerOptions
): ClassDecorator {
  const defaultPath = '/';
  const [path, host] = isUndefined(prefixOrOptions)
    ? [defaultPath, undefined]
    : isString(prefixOrOptions)
    ? [prefixOrOptions, undefined]
    : [prefixOrOptions.path || defaultPath, prefixOrOptions.host];
  return (target: object) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
    Reflect.defineMetadata(HOST_METADATA, host, target);
  };
}
