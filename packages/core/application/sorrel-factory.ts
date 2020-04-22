import {Type, Module, Controller, Injectable, Get} from '@sorrel/common';
import {SorrelApplicationConfig} from './sorrel-application-config';
import {SorrelContainer} from '../injector';
import {SorrelApplication} from './sorrel-application';
import {InstanceLoader} from '../injector/instance-loader';
import {DependenciesScanner} from '../scanner/dependencies-scanner';
import {MetadataScanner} from '../scanner/metadata-scanner';

export class SorrelFactoryStatic {
  public create(module: Type<any>) {
    const applicationConfig = new SorrelApplicationConfig();
    const container = new SorrelContainer(applicationConfig);
    return this.init(module, container, applicationConfig);
  }

  public init(
    module: Type<any>,
    container: SorrelContainer,
    applicationConfig: SorrelApplicationConfig
  ) {
    const instanceLoader = new InstanceLoader(container);
    const dependenciesScanner = new DependenciesScanner(
      container,
      new MetadataScanner(),
      applicationConfig
    );
    dependenciesScanner.scan(module);
    instanceLoader.createInstancesOfDependencies();
    const instance = new SorrelApplication(container, applicationConfig);

    return instance;
  }
}

export const SorrelFactory = new SorrelFactoryStatic();

@Injectable()
class TestBaseService {}

@Injectable()
class TestService {
  constructor(private readonly testBaseService: TestBaseService) {}
}

@Controller('aaa')
class TestController {
  constructor(private readonly testService: TestService) {}
  @Get()
  public test() {
    console.log('test');
  }
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
app.listen(8080);

console.log(app);
