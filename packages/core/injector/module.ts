import {SorrelContainer} from './container';
import {Type} from '@sorrel/common';

export class Module {
  private readonly _id!: string;
  private readonly _imports = new Set<Module>();
  private readonly _providers = new Map();
  private readonly _injectable = new Map();
  private readonly _controllers = new Map();
  private readonly _middlewares = new Map();
  private readonly _exports = new Set();

  constructor(
    private readonly _metaType: Type<any>,
    private readonly _container: SorrelContainer
  ) {}

  get id() {
    return this._id;
  }

  get providers() {
    return this._providers;
  }

  get injectable() {
    return this._injectable;
  }

  get controllers() {
    return this._controllers;
  }

  get exports() {
    return this._exports;
  }

  get middlewares() {
    return this._middlewares;
  }

  get imports() {
    return this._imports;
  }

  get instance() {
    if (!this._providers.has(this._metaType.name)) {
      throw new Error('runtime error');
    }
    const module = this._providers.get(this._metaType.name);
    return module.instance;
  }

  get metaType() {
    return this._metaType;
  }
}
