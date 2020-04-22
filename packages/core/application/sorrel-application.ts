import {Type} from '@sorrel/common';
import {SorrelContainer} from '../injector';
import {SorrelApplicationConfig} from './sorrel-application-config';
import {HttpService} from '../http-service/http-server';
import {RoutesResolver} from '../router/routes-resolver';

export class SorrelApplication extends HttpService {
  private readonly routesResolver: RoutesResolver;
  constructor(
    private readonly container: SorrelContainer,
    private readonly config: SorrelApplicationConfig
  ) {
    super();
    this.container.setHttpService(this);
    this.routesResolver = new RoutesResolver(this.container, this.config);
    this.init();
  }

  private init() {
    this.registerRouter();
  }

  private registerRouter() {
    const prefix = this.config.getGlobalPrefix();
    this.routesResolver.resolve(this, prefix);
  }
}
