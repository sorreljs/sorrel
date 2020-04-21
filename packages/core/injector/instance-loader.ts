import {SorrelContainer} from './container';
import {ModuleContainer} from './module-container';
import {Module} from './module';
import {Injector} from './injector';

export class InstanceLoader {
  private readonly injector = new Injector();
  constructor(private readonly container: SorrelContainer) {}

  public createInstancesOfDependencies() {
    const modules = this.container.getModules();
    this.createPrototypes(modules);
    this.createInstances(modules);
  }

  private createPrototypes(modules: ModuleContainer) {
    modules.forEach(module => {
      this.createPrototypesOfProviders(module);
    });
  }

  private createPrototypesOfProviders(module: Module) {
    const {providers} = module;
    const wrapper = [...providers.values()];
    wrapper.forEach(item => this.injector.loadPrototype(item, providers));
  }

  private createInstances(modules: ModuleContainer) {
    modules.forEach(module => {
      this.createInstancesOfProviders(module);
    });
  }

  private createInstancesOfProviders(module: Module) {
    const {providers} = module;
    const wrapper = [...providers.values()];
    wrapper.forEach(item => this.injector.loadProvider(item, module));
  }
}
