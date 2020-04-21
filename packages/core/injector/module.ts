import {Type} from '@sorrel/common';
import {randomStringGenerator} from '@sorrel/common/utils';
import {SorrelContainer} from './container';
import {Controller, Provider, Export} from '@sorrel/common/interfaces';
import {InstanceWrapper} from './instance-wrapper';
import {InstanceWrapperContainer} from './instance-wrapper-container';

export class Module {
  public readonly id: string;
  public readonly imports = new Set<Module>();
  public readonly providers = new InstanceWrapperContainer<Provider>();
  public readonly injectable = new InstanceWrapperContainer<any>();
  public readonly controllers = new InstanceWrapperContainer<Controller>();
  public readonly middlewares = new InstanceWrapperContainer();
  public readonly exports = new Set<string | symbol>();

  constructor(
    public readonly metatype: Type<any>,
    public readonly container: SorrelContainer
  ) {
    this.id = randomStringGenerator();
  }

  // get instance() {
  //   if (!this.providers.has(this.metatype.name)) {
  //     throw new Error('runtime error');
  //   }
  //   const module = this.providers.get(this.metatype.name);
  //   return module.instance;
  // }

  public addRelatedModule(module: Module) {
    this.imports.add(module);
  }

  public addProvider(provider: Provider) {
    this.providers.set(provider.name, new InstanceWrapper(provider, this));
  }

  public addController(controller: Controller) {
    this.controllers.set(
      controller.name,
      new InstanceWrapper(controller, this)
    );
  }

  public addExportProvider(exportProvider: Export) {
    this.exports.add(this.validateExport(exportProvider.name));
  }

  public validateExport(token: string | symbol) {
    if (this.providers.has(token)) {
      return token;
    }
    throw new Error('invalid export token');
  }
}
