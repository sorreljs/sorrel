import {Type} from '@sorrel/common';
import {Module} from './module';

export class InstanceWrapper<T> {
  public readonly name: any;
  public readonly host!: Module;

  public readonly metatype!: Type<T>;

  public instance: any = null;

  constructor(metatype: Type<any>, host: Module) {
    this.host = host;
    this.metatype = metatype;
    this.name = metatype.name;
  }

  public createPrototype() {
    this.instance = Object.create(this.metatype.prototype);
  }
}
