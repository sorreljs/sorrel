import {HOST_METADATA} from '@sorrel/common';
import {Controller} from '@sorrel/common/interfaces';
import {SorrelContainer} from '../injector';
import {SorrelApplicationConfig} from '../application';
import {MetadataScanner} from '../scanner/metadata-scanner';
import {RouterExplorer} from './router-explorer';
import {InstanceWrapperContainer} from '../injector/instance-wrapper-container';
import {HttpService} from '../http-service/http-server';

export class RoutesResolver {
  private readonly routerExplorer: RouterExplorer;
  constructor(
    private readonly container: SorrelContainer,
    private readonly config: SorrelApplicationConfig
  ) {
    const metadataScanner = new MetadataScanner();
    this.routerExplorer = new RouterExplorer(
      metadataScanner,
      this.container,
      this.config
    );
  }

  public resolve(applicationRef: HttpService, basePath: string) {
    const modules = this.container.getModules();
    modules.forEach(({controllers}, moduleName) => {
      this.registerRouters(controllers, moduleName, basePath, applicationRef);
    });
  }

  public registerRouters(
    routes: InstanceWrapperContainer<Controller>,
    moduleName: string,
    basePath: string,
    applicationRef: HttpService
  ) {
    routes.forEach(instanceWrapper => {
      const {metatype} = instanceWrapper;
      const host = this.getHostMetadata(metatype);
      const path = this.routerExplorer.extractRouterPath(metatype, basePath);
      this.routerExplorer.explore(
        instanceWrapper,
        moduleName,
        applicationRef,
        path,
        host
      );
    });
  }

  private getHostMetadata(metatype: Controller) {
    return Reflect.getMetadata(HOST_METADATA, metatype);
  }
}
