import {Prototype} from '@sorrel/common';
import {isConstructor, isNil, isFunction} from '@sorrel/common/utils';
import {iterate} from 'iterare';

export class MetadataScanner {
  constructor() {
    // pass
  }
  public scanFromPrototype<T, R>(
    instance: T,
    prototype: Prototype,
    callback: () => R
  ): R[] {
    const methodNames = new Set(this.getAllMethodNames(prototype));
    return iterate(methodNames)
      .map(callback)
      .filter(metadata => !isNil(metadata))
      .toArray();
  }

  private *getAllMethodNames(prototype: Prototype): IterableIterator<string> {
    const isMethod = (prop: string) => {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);
      if (descriptor?.get || descriptor?.set) {
        return false;
      }
      return !isConstructor(prop) && isFunction(prototype[prop]);
    };
    do {
      yield* iterate(Object.getOwnPropertyNames(prototype))
        .filter(prop => isMethod(prop))
        .toArray();
    } while (
      (prototype = Reflect.getPrototypeOf(prototype)) &&
      prototype !== Object.prototype
    );
  }
}
