import {PATH_METADATA, METHOD_METADATA, RequestMethod} from '@sorrel/common';
import {validatePath, isUndefined} from '@sorrel/common/utils';
import {Controller} from '@sorrel/common/interfaces';
import {MetadataScanner} from '../scanner/metadata-scanner';
import {SorrelContainer} from '../injector';
import {SorrelApplicationConfig} from '../application';
import {InstanceWrapper} from '../injector/instance-wrapper';
import {HttpService} from '../http-service/http-server';

interface Route<T extends object, K extends keyof T> {
  path: string;
  requestMethod: RequestMethod;
  targetCallback: T[K];
  methodName: K;
}

export class RouterExplorer {
  constructor(
    private readonly metadataScanner: MetadataScanner,
    private readonly container: SorrelContainer,
    private readonly config: SorrelApplicationConfig
  ) {}

  public extractRouterPath(metatype: Controller, prefix?: string) {
    let path = Reflect.getMetadata(PATH_METADATA, metatype);
    path = prefix
      ? this.validateRoutePath(prefix + this.validateRoutePath(path))
      : this.validateRoutePath(path);
    return path;
  }

  public explore(
    instanceWrapper: InstanceWrapper<Controller>,
    moduleName: string,
    applicationRef: HttpService,
    basePath: string,
    host: string
  ) {
    const {instance} = instanceWrapper;
    const route = this.scanForPaths(instance);
    console.log(route);
    this.applyRouters(applicationRef, route);
  }

  private scanForPaths(instance: object) {
    const instancePrototype = Object.getPrototypeOf(instance);
    return this.metadataScanner.scanFromPrototype(instancePrototype, method =>
      this.exploreMethodMetadata(instancePrototype, method)
    );
  }

  private exploreMethodMetadata<T extends object, K extends keyof T>(
    prototype: T,
    methodName: K
  ): Route<T, K> {
    const targetCallback = prototype[methodName];
    let routePath = Reflect.getMetadata(PATH_METADATA, targetCallback);
    if (routePath === '/') {
      routePath = methodName;
    }
    const requestMethod: RequestMethod = Reflect.getMetadata(
      METHOD_METADATA,
      targetCallback
    );
    const path = this.validateRoutePath(routePath);
    return {
      path,
      requestMethod,
      targetCallback,
      methodName
    };
  }

  private applyRouters(
    applicationRef: HttpService,
    route: Route<any, string>[]
  ) {
    route.forEach(item => {
      const {path, requestMethod, targetCallback} = item;
      const router = applicationRef.getRouter();
      switch (requestMethod) {
        case RequestMethod.GET:
          router.get(path, targetCallback);
      }
    });
  }

  private validateRoutePath(path: string): string {
    if (isUndefined(path)) {
      throw new Error('unknown router path');
    }
    return validatePath(path);
  }
}
