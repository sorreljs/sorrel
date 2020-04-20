import {SorrelContainer} from './container';

export class InstanceLoader {
  constructor(private readonly container: SorrelContainer) {}

  public createInstancesOfDependencies() {
    const modules = this.container.getModules();
  }
}
