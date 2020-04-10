import {RequestMethod} from '../../enums/request-method.enum';
import {METHOD_METADATA, PATH_METADATA} from '../../constants';

export interface RequestMappingMetadata {
  path?: string | string[];
  method?: RequestMethod;
}

const defaultMetadata: RequestMappingMetadata = {
  [PATH_METADATA]: '/',
  [METHOD_METADATA]: RequestMethod.GET
};

export function RequestMapping(
  metadata: RequestMappingMetadata = defaultMetadata
): MethodDecorator {
  const pathMetadata = metadata[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;
  return <T>(
    _target: object,
    _key: string | symbol,
    description: TypedPropertyDescriptor<T>
  ) => {
    const value = description.value;
    if (value) {
      Reflect.defineMetadata(METHOD_METADATA, requestMethod, value);
      Reflect.defineMetadata(PATH_METADATA, path, value);
    }
    return description;
  };
}

function createMappingDecorator(method: RequestMethod) {
  return (path?: RequestMappingMetadata['path']) =>
    RequestMapping({method, path});
}

export const Get = createMappingDecorator(RequestMethod.GET);

export const Post = createMappingDecorator(RequestMethod.POST);

export const Put = createMappingDecorator(RequestMethod.PUT);

export const Delete = createMappingDecorator(RequestMethod.DELETE);

export const Patch = createMappingDecorator(RequestMethod.PATCH);

export const All = createMappingDecorator(RequestMethod.ALL);

export const Options = createMappingDecorator(RequestMethod.OPTIONS);

export const Head = createMappingDecorator(RequestMethod.HEAD);
