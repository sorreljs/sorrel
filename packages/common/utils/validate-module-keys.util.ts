import {MODULE_METADATA as metadataConstants} from '../constants';

export const INVALID_MODULE_CONFIG_MESSAGE = (
  _: TemplateStringsArray,
  ...property: string[]
) => `Invalid property '${property}' passed into the @Module() decorator.`;

const metadataKeys = [
  metadataConstants.IMPORTS,
  metadataConstants.CONTROLLERS,
  metadataConstants.PROVIDERS,
  metadataConstants.EXPORTS
];

export function validateModuleKeys(keys: string[]) {
  const validateKey = (key: string) => {
    if (metadataKeys.includes(key)) {
      return;
    }
    throw new Error(INVALID_MODULE_CONFIG_MESSAGE`${key}`);
  };
  keys.forEach(validateKey);
}
