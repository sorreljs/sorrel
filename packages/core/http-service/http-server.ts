import {Server, ListenOptions} from 'net';
import {IncomingMessage, ServerResponse} from 'http';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaStatic from 'koa-static';
import * as koaViews from 'koa-views';

export class HttpService<StateT = any, CustomT = {}> {
  private readonly instance = new Koa();
  private readonly router = new Router();
  constructor() {
    this.instance.use(this.router.routes());
  }

  public server(dir: string, options?: koaStatic.Options) {
    this.instance.use(koaStatic(dir, options));
    return this;
  }

  public views(dir: string, options: any) {
    this.instance.use(koaViews(dir, options));
    return this;
  }

  public get(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public get(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public get<T, U>(
    name: string,
    path: string | RegExp,
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;
  public get<T, U>(
    path: string | RegExp | (string | RegExp)[],
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;

  public get(...args: any[]) {
    const [name, path, ...middlewares] = args;
    return this.router.get(name, path, ...middlewares);
  }

  public post(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public post(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public post<T, U>(
    name: string,
    path: string | RegExp,
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;
  public post<T, U>(
    path: string | RegExp | (string | RegExp)[],
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;

  public post(...args: any[]) {
    const [name, path, ...middlewares] = args;
    return this.router.post(name, path, ...middlewares);
  }

  public put(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public put(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public put<T, U>(
    name: string,
    path: string | RegExp,
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;
  public put<T, U>(
    path: string | RegExp | (string | RegExp)[],
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;

  public put(...args: any[]) {
    const [name, path, ...middlewares] = args;
    return this.router.put(name, path, ...middlewares);
  }

  public delete(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public delete(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public delete<T, U>(
    name: string,
    path: string | RegExp,
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;
  public delete<T, U>(
    path: string | RegExp | (string | RegExp)[],
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;

  public delete(...args: any[]) {
    const [name, path, ...middlewares] = args;
    return this.router.delete(name, path, ...middlewares);
  }

  public patch(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public patch(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public patch<T, U>(
    name: string,
    path: string | RegExp,
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;
  public patch<T, U>(
    path: string | RegExp | (string | RegExp)[],
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;

  public patch(...args: any[]) {
    const [name, path, ...middlewares] = args;
    return this.router.patch(name, path, ...middlewares);
  }

  public all(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public all(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public all<T, U>(
    name: string,
    path: string | RegExp,
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;
  public all<T, U>(
    path: string | RegExp | (string | RegExp)[],
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;

  public all(...args: any[]) {
    const [name, path, ...middlewares] = args;
    return this.router.all(name, path, ...middlewares);
  }

  public options(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public options(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public options<T, U>(
    name: string,
    path: string | RegExp,
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;
  public options<T, U>(
    path: string | RegExp | (string | RegExp)[],
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;

  public options(...args: any[]) {
    const [name, path, ...middlewares] = args;
    return this.router.all(name, path, ...middlewares);
  }

  public head(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public head(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT, CustomT>>
  ): Router<StateT, CustomT>;
  public head<T, U>(
    name: string,
    path: string | RegExp,
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;
  public head<T, U>(
    path: string | RegExp | (string | RegExp)[],
    middleware: Koa.Middleware<T, U>,
    routeHandler: Router.IMiddleware<StateT & T, CustomT & U>
  ): Router<StateT & T, CustomT & U>;

  public head(...args: any[]) {
    const [name, path, ...middlewares] = args;
    return this.router.all(name, path, ...middlewares);
  }

  public listen(
    port?: number,
    hostname?: string,
    backlog?: number,
    listeningListener?: () => void
  ): Server;
  public listen(
    port: number,
    hostname?: string,
    listeningListener?: () => void
  ): Server;
  public listen(
    port: number,
    backlog?: number,
    listeningListener?: () => void
  ): Server;
  public listen(port: number, listeningListener?: () => void): Server;
  public listen(
    path: string,
    backlog?: number,
    listeningListener?: () => void
  ): Server;
  public listen(path: string, listeningListener?: () => void): Server;
  public listen(options: ListenOptions, listeningListener?: () => void): Server;
  public listen(
    handle: any,
    backlog?: number,
    listeningListener?: () => void
  ): Server;
  public listen(handle: any, listeningListener?: () => void): Server;

  public listen(...args: any[]) {
    return this.instance.listen(...args);
  }

  public toJSON() {
    this.instance.toJSON();
  }

  public use<NewStateT = {}, NewCustomT = {}>(
    middleware: Koa.Middleware<StateT & NewStateT, CustomT & NewCustomT>
  ) {
    return this.instance.use(middleware);
  }

  public callback() {
    return this.instance.callback();
  }

  public createContext(req: IncomingMessage, res: ServerResponse) {
    return this.instance.createContext(req, res);
  }

  public onerror(err: Error) {
    return this.instance.onerror(err);
  }

  public getInstance() {
    return this.instance;
  }

  public getRouter() {
    return this.router;
  }
}
