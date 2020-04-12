import {HTTP_CODE_METADATA} from '../../constants';

export function HttpCode(statusCode: number): MethodDecorator {
  return <T>(
    _target: object,
    _key: string | symbol,
    description: TypedPropertyDescriptor<T>
  ) => {
    const value = description.value;
    if (value) {
      Reflect.defineMetadata(HTTP_CODE_METADATA, statusCode, value);
    }
    return description;
  };
}
