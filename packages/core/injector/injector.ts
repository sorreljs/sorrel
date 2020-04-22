import {Type} from '@sorrel/common';
import {Provider, Controller} from '@sorrel/common/interfaces';
import {InstanceWrapper} from './instance-wrapper';
import {Module} from './module';
import {InstanceWrapperContainer} from './instance-wrapper-container';

export class Injector {
  public loadPrototype<T>(
    {name}: InstanceWrapper<T>,
    wrapperContainer: InstanceWrapperContainer<T>
  ) {
    const target = wrapperContainer.get(name);
    target?.createPrototype();
  }

  public loadProvider(wrapper: InstanceWrapper<Provider>, moduleRef: Module) {
    const {providers} = moduleRef;
    this.loadInstance(wrapper, providers, moduleRef);
  }

  public loadController(
    wrapper: InstanceWrapper<Controller>,
    moduleRef: Module
  ) {
    const {controllers} = moduleRef;
    this.loadInstance(wrapper, controllers, moduleRef);
  }

  private loadInstance<T>(
    wrapper: InstanceWrapper<T>,
    wrapperContainer: InstanceWrapperContainer<T>,
    moduleRef: Module
  ) {
    const {name} = wrapper;
    const targetWrapper = wrapperContainer.get(name);
    if (!targetWrapper) {
      throw new Error('xxx');
    }
    const callback = (instances: unknown[]) => {
      this.instantiateClass(instances, wrapper);
    };
    this.resolveConstructorParams(wrapper, moduleRef, callback);
  }

  private resolveConstructorParams<T>(
    wrapper: InstanceWrapper<T>,
    moduleRef: Module,
    callback: (...args: any) => any
  ) {
    const dependencies = this.reflectConstructorParams(wrapper.metatype);
    const instances = dependencies.map(param => {
      const {providers} = moduleRef;
      return providers.get(param.name)?.instance;
    });
    callback(instances);
  }

  private reflectConstructorParams(metatype: Type<any>): Type<any>[] {
    return Reflect.getMetadata('design:paramtypes', metatype) || [];
  }

  private instantiateClass<T>(
    instances: unknown[],
    wrapper: InstanceWrapper<T>
  ) {
    const {metatype, instance} = wrapper;
    Object.assign(instance, new metatype(...instances));
    return instance;
  }
}
