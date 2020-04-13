import {isConstructor, isNil, isFunction, Prototype} from '@sorrel/common';
import {iterate} from 'iterare';

export class MetadataScanner {
  scanFromPrototype<T, R>(
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

  *getAllMethodNames(prototype: Prototype): IterableIterator<string> {
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
