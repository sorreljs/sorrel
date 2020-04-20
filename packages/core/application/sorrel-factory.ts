import {Type, Module, Controller, Injectable} from '@sorrel/common';
import * as Koa from 'koa';
import {SorrelApplicationConfig} from './sorrel-application-config';
import {SorrelContainer} from '../injector';
import {SorrelApplication} from './sorrel-application';
import {InstanceLoader} from '../injector/instance-loader';
import {DependenciesScanner} from '../scanner/dependencies-scanner';
import {MetadataScanner} from '../scanner/metadata-scanner';

export class SorrelFactoryStatic {
  public create(module: Type<any>) {
    const httpServer = new Koa();
    const applicationConfig = new SorrelApplicationConfig();
    const container = new SorrelContainer(applicationConfig);
    this.init(module, container, applicationConfig, httpServer);
  }

  public init(
    module: Type<any>,
    container: SorrelContainer,
    applicationConfig: SorrelApplicationConfig,
    httpServer: Koa
  ) {
    const instanceLoader = new InstanceLoader(container);
    const dependenciesScanner = new DependenciesScanner(
      container,
      new MetadataScanner(),
      applicationConfig
    );

    dependenciesScanner.scan(module);
    return container;
  }
}

export const SorrelFactory = new SorrelFactoryStatic();

@Injectable()
class TestBaseService {}

@Injectable()
class TestService {
  constructor(private readonly testBaseService: TestBaseService) {}
}

@Controller()
class TestController {
  constructor(private readonly testService: TestService) {}
}

@Module({
  controllers: [TestController],
  providers: [TestService, TestBaseService],
  exports: [TestService]
})
class TestModule {}

@Controller()
class AppController {}

@Module({
  imports: [TestModule],
  controllers: [AppController]
})
class AppModule {}

const app = SorrelFactory.create(AppModule);

console.log(app);
