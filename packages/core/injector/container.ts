import {Type} from '@sorrel/common';
import {SorrelApplicationConfig} from '../application';
import {ModuleContainer} from './module-container';
import {ModuleCompiler} from './module-compiler';
import {ModuleTokenFactory} from './module-token-factory';
import {Module} from './module';

export class SorrelContainer {
  private readonly moduleTokenFactory = new ModuleTokenFactory();
  private readonly moduleCompiler = new ModuleCompiler(this.moduleTokenFactory);
  private readonly modules = new ModuleContainer();
  private httpServer: any;

  constructor(private readonly _applicationConfig: SorrelApplicationConfig) {}

  get applicationConfig() {
    return this._applicationConfig;
  }

  public addModule(metatype: Type<any>) {
    if (!metatype) {
      throw new Error('Invalid module');
    }
    const {type, token} = this.moduleCompiler.compile(metatype);
    if (this.modules.has(token)) {
      return;
    }

    const moduleRef = new Module(type, this);
    this.modules.set(token, moduleRef);
    return moduleRef;
  }

  public getModules() {
    return this.modules;
  }

  public addImport(relatedModule: Type<any>, token: string) {
    const moduleRef = this.modules.get(token);
    if (!moduleRef) {
      return;
    }
    const {token: relatedToken} = this.moduleCompiler.compile(relatedModule);
    const related = this.modules.get(relatedToken);
    related && moduleRef.addRelatedModule(related);
  }

  public addProvider(provider: Type<any>, token: string) {
    const moduleRef = this.modules.get(token);
    if (!moduleRef) {
      return;
    }
    return moduleRef.addProvider(provider);
  }

  public addController(controller: Type<any>, token: string) {
    const moduleRef = this.modules.get(token);
    if (!moduleRef) {
      return;
    }
    return moduleRef.addController(controller);
  }

  public addExportProvider(exportProvider: Type<any>, token: string) {
    const moduleRef = this.modules.get(token);
    if (!moduleRef) {
      return;
    }
    return moduleRef.addExportProvider(exportProvider);
  }

  public setHttpServer(httpServer: any) {
    this.httpServer = httpServer;
  }
}
