import {ApplicationConfig} from '../application';
import {ModuleContainer} from './module-container';
import {ModuleCompiler} from './module-compiler';

export class SorrelContainer {
  private readonly moduleCompiler = new ModuleCompiler();
  private readonly modules = new ModuleContainer();
}
