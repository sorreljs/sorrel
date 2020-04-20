import {Type} from '../type.interface';

export type Provider<T = any> = Type<T>;
export type Controller<T = any> = Type<T>;
export type Import<T = any> = Type<T>;
export type Export<T = any> = Type<T>;
export interface ModuleMetadata {
  imports?: Import[];
  controllers?: Controller[];
  providers?: Provider[];
  exports?: Export[];
}
