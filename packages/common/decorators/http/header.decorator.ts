import {HEADERS_METADATA} from '../../constants';

export function Header(name: string, value: string): MethodDecorator {
  return <T>(
    _target: object,
    key: string | symbol,
    description: TypedPropertyDescriptor<T>
  ) => {
    const descriptionValue = description.value;
    if (descriptionValue) {
      const previousValue =
        Reflect.getMetadata(HEADERS_METADATA, descriptionValue) || [];
      Reflect.defineMetadata(
        HEADERS_METADATA,
        [...previousValue, {name, value}],
        descriptionValue
      );
    }
    return description;
  };
}
