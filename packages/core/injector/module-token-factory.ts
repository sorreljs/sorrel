import {Type} from '@sorrel/common';
import {hash} from '@sorrel/common/utils';
import {randomStringGenerator} from '@sorrel/common/utils';

export class ModuleTokenFactory {
  private readonly moduleIdsCache = new WeakMap<Type<any>, string>();

  public create(metatype: Type<any>) {
    const moduleId = this.getModuleId(metatype);
    const opaqueToken = {
      id: moduleId,
      module: this.getModuleName(metatype)
    };
    return hash(opaqueToken);
  }

  public getModuleId(metatype: Type<any>) {
    let moduleId = this.moduleIdsCache.get(metatype);
    if (!moduleId) {
      moduleId = randomStringGenerator();
      this.moduleIdsCache.set(metatype, moduleId);
    }
    return moduleId;
  }

  public getModuleName(metatype: Type<any>) {
    return metatype.name;
  }
}
