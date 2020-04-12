import {RENDER_METADATA} from '../../constants';

export function Render(template: string): MethodDecorator {
  return <T>(
    _target: object,
    _key: string | symbol,
    description: TypedPropertyDescriptor<T>
  ) => {
    const value = description.value;
    if (value) {
      Reflect.defineMetadata(RENDER_METADATA, template, value);
    }
    return description;
  };
}
