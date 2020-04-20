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
      this.reflectProviders(metatype, token);
      this.reflectControllers(metatype, token);
      this.reflectExports(metatype, token);
    }
  }

  private reflectImports(module: Type<any>, token: string) {
    const modules = [...this.reflectMetadata(module, MODULE_METADATA.IMPORTS)];
    modules.forEach(related => {
      this.insertImport(related, token);
    });
  }

  private reflectProviders(module: Type<any>, token: string) {
    const providers = [
      ...this.reflectMetadata(module, MODULE_METADATA.PROVIDERS)
    ];
    providers.forEach(provider => {
      this.insertProvider(provider, token);
    });
  }

  private reflectControllers(module: Type<any>, token: string) {
    const controllers = [
      ...this.reflectMetadata(module, MODULE_METADATA.CONTROLLERS)
    ];
    controllers.forEach(controller => {
      this.insertController(controller, token);
    });
  }

  private reflectExports(module: Type<any>, token: string) {
    const exportsProvider = [
      ...this.reflectMetadata(module, MODULE_METADATA.EXPORTS)
    ];
    exportsProvider.forEach(exportsProvider => {
      this.insertExportProvider(exportsProvider, token);
    });
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

  private insertController(controller: Type<any>, token: string) {
    this.container.addController(controller, token);
  }

  private insertExportProvider(exportProvider: Type<any>, token: string) {
    this.container.addExportProvider(exportProvider, token);
  }
}
