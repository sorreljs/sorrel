import {Type} from '@sorrel/common';
import {SorrelContainer} from '../injector';
import {SorrelApplicationConfig} from './sorrel-application-config';

export class SorrelApplication {
  constructor(
    private readonly module: Type<any>,
    private readonly container: SorrelContainer,
    private readonly config: SorrelApplicationConfig
  ) {}
}
