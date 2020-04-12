import {ModuleMetadata} from 'interfaces';
import {validateModuleKeys} from 'utils';

export function Module(metadata: ModuleMetadata): ClassDecorator {
  const keys = Object.keys(metadata);
  validateModuleKeys(keys);

  return (target: object) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata['imports'], target);
      }
    }
  };
}
