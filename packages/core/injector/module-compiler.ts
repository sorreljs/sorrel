import {Type} from '@sorrel/common';
import {ModuleTokenFactory} from './module-token-factory';

export class ModuleCompiler {
  constructor(private readonly moduleTokenFactory: ModuleTokenFactory) {}

  public compile(metatype: Type<any>) {
    const token = this.moduleTokenFactory.create(metatype);
    return {type: metatype, token};
  }
}
