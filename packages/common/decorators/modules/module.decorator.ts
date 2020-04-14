import {ModuleMetadata} from '../../interfaces';
import {validateModuleKeys} from '../../utils';

export function Module<T extends ModuleMetadata>(metadata: T): ClassDecorator {
  const keys = Object.keys(metadata);
  validateModuleKeys(keys);

  return (target: object) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata[property], target);
      }
    }
  };
}
