import {Type} from '../type.interface';
export interface ModuleMetadata {
  imports?: Array<Type<any>>;
  controllers?: Array<Type<any>>;
  providers?: Array<Type<any>>;
  exports?: Array<Type<any>>;
}
