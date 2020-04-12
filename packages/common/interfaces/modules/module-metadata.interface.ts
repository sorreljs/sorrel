import {Type} from 'interfaces/type';

export interface ModuleMetadata {
  imports?: Array<Type<any>>;
  controllers?: Array<Type<any>>;
  providers?: Array<Type<any>>;
  exports?: Array<Type<any>>;
}
