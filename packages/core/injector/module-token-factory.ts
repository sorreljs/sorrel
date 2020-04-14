import {Type} from '@sorrel/common';
import {randomStringGenerator} from '@sorrel/common/utils';

export class ModuleTokenFactory {
  private readonly moduleIdsCache = new WeakMap<Type<any>, string>();

  public create(metaType: Type<any>) {
    // pass
  }

  public getModuleId(metaType: Type<any>) {
    let moduleId = this.moduleIdsCache.get(metaType);
    if (!moduleId) {
      moduleId = randomStringGenerator();
      this.moduleIdsCache.set(metaType, moduleId);
    }
    return moduleId;
  }

  public getModuleName(metaType: Type<any>) {
    return metaType.name;
  }
}
