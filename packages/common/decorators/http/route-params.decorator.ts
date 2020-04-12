import 'reflect-metadata';

import {ROUTE_ARGS_METADATA} from '../../constants';
import {RouteParamTypes} from '../../enums/route-param-types.enum';

export type ParamData = object | string | number;

export interface RouteParamMetadata {
  index: number;
  data?: ParamData;
}

function assignMetadata<TParamType, TArgs>(
  args: TArgs,
  paramType: TParamType,
  index: number,
  data?: ParamData
) {
  return {
    ...args,
    [`${paramType}:${index}`]: {
      index,
      data
    }
  };
}

function createRouterParamDecorator(paramType: RouteParamTypes) {
  return (data?: ParamData): ParameterDecorator => (target, key, index) => {
    const args =
      Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {};

    Reflect.defineMetadata(
      ROUTE_ARGS_METADATA,
      assignMetadata(args, paramType, index, data),
      target.constructor
    );
  };
}

export const Request: () => ParameterDecorator = createRouterParamDecorator(
  RouteParamTypes.REQUEST
);

export const Response: () => ParameterDecorator = createRouterParamDecorator(
  RouteParamTypes.RESPONSE
);

export const Next: () => ParameterDecorator = createRouterParamDecorator(
  RouteParamTypes.NEXT
);

export const Ip: () => ParameterDecorator = createRouterParamDecorator(
  RouteParamTypes.IP
);

export const Session: () => ParameterDecorator = createRouterParamDecorator(
  RouteParamTypes.SESSION
);

export const UploadedFile: (
  fileKey: string
) => ParameterDecorator = createRouterParamDecorator(RouteParamTypes.FILE);

export const UploadedFiles: () => ParameterDecorator = createRouterParamDecorator(
  RouteParamTypes.FILES
);

export const Headers: (
  prop: string
) => ParameterDecorator = createRouterParamDecorator(RouteParamTypes.HEADERS);

export const Query: (
  prop?: string
) => ParameterDecorator = createRouterParamDecorator(RouteParamTypes.QUERY);

export const Body: (
  prop?: string
) => ParameterDecorator = createRouterParamDecorator(RouteParamTypes.BODY);

export const Param: (
  prop?: string
) => ParameterDecorator = createRouterParamDecorator(RouteParamTypes.PARAM);

export const HostParam: (
  prop?: string
) => ParameterDecorator = createRouterParamDecorator(RouteParamTypes.HOST);

export const Req = Request;
export const Res = Response;
