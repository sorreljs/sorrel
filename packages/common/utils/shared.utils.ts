export function isUndefined(obj: any): obj is undefined {
  return typeof obj === 'undefined';
}

export function isNil(obj: any): obj is null | undefined {
  return isUndefined(obj) || obj === null;
}

export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function';
}
export function isObject(obj: any): obj is object {
  return !isNil(obj) && typeof obj === 'object';
}

export function isString(obj: any): obj is string {
  return typeof obj === 'string';
}

export function isConstructor(fn: any) {
  return fn === 'constructor';
}

export function isEmpty(array: any[]) {
  return !(array.length > 0);
}

export function isSymbol(obj: any): obj is symbol {
  return typeof obj === 'symbol';
}

export function validatePath(path: string) {
  return path.charAt(0) !== '/' ? `/${path}` : path;
}
