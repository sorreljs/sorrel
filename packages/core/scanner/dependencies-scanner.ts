import {Type, MODULE_METADATA} from '@sorrel/common';
import {SorrelContainer} from '../injector';
import {MetadataScanner} from './metadata-scanner';
import {SorrelApplicationConfig} from '../application';
import {Module} from '../injector/module';

export class DependenciesScanner {
  constructor(
    private readonly container: SorrelContainer,
    private readonly metadataScanner: MetadataScanner,
    private readonly applicationConfig: SorrelApplicationConfig
  ) {}

  public scan(module: Type<any>) {
    this.scanFromModule(module);
    this.scanModulesFromDependencies();
    console.log(this.container);
  }

  private scanFromModule(module: Type<any>, contextRegister: Module[] = []) {
    const moduleInstance = this.insertModule(module);
    moduleInstance && contextRegister.push(moduleInstance);
    const modules = [...this.reflectMetadata(module, MODULE_METADATA.IMPORTS)];

    for (const innerModule of modules) {
      if (contextRegister.includes(innerModule)) {
        continue;
      }
      this.scanFromModule(innerModule, contextRegister);
    }
  }

  private scanModulesFromDependencies() {
    const modules = this.container.getModules();
    for (const [token, {metatype}] of modules) {
      this.reflectImports(metatype, token);
    }
  }

  private reflectImports(module: Type<any>, token: string) {
    const modules = [...this.reflectMetadata(module, MODULE_METADATA.IMPORTS)];
    for (const related of modules) {
      this.insertImport(related, token);
    }
  }

  private reflectProvider(module: Type<any>, token: string) {
    const providers = [
      ...this.reflectMetadata(module, MODULE_METADATA.PROVIDERS)
    ];
    for (const provider of providers) {
      this.insertProvider(provider, token);
    }
  }

  private reflectMetadata(metatype: Type<any>, metatypeKey: string) {
    return Reflect.getMetadata(metatypeKey, metatype) ?? [];
  }

  private insertModule(module: Type<any>) {
    return this.container.addModule(module);
  }

  private insertImport(related: Type<any>, token: string) {
    return this.container.addImport(related, token);
  }

  private insertProvider(provider: Type<any>, token: string) {
    return this.container.addProvider(provider, token);
  }
}
