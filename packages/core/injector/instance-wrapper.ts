import {Type} from '@sorrel/common';
import {Module} from './module';

export class InstanceWrapper {
  public readonly name: any;
  public readonly host!: Module;

  public readonly metatype!: Type<any>;

  private readonly values = new WeakMap();
}
