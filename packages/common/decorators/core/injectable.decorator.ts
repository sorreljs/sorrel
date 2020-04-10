import {DI_METADATA} from '../../constants';

export function Injectable(options?: any): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(DI_METADATA, options, target);
  };
}
