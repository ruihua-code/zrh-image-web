/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
// prettier-ignore
import { Method, RequestBodyType, ResponseBodyType, RequestConfig, RequestFunctionRestArgs, FileData, prepare } from '@mlamp/yapi-to-typescript'
// @ts-ignore
import request from './request';

// makeRequest
function makeRequestRequired<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(
    requestConfig: TRequestConfig
) {
    const req = function (requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) {
        return request<TResponseData>(prepare(requestConfig, requestData), ...args);
    };
    req.requestConfig = requestConfig;
    return req;
}
function makeRequestOptional<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(
    requestConfig: TRequestConfig
) {
    const req = function (requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) {
        return request<TResponseData>(prepare(requestConfig, requestData), ...args);
    };
    req.requestConfig = requestConfig;
    return req;
}
function makeRequest<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(requestConfig: TRequestConfig) {
    const optional = makeRequestOptional<TReqeustData, TResponseData, TRequestConfig>(requestConfig);
    const required = makeRequestRequired<TReqeustData, TResponseData, TRequestConfig>(requestConfig);
    return (
        requestConfig.requestDataOptional ? optional : required
    ) as TRequestConfig['requestDataOptional'] extends true ? typeof optional : typeof required;
}

// Request
export type Request<TReqeustData, TRequestConfig extends RequestConfig, TRequestResult> =
    (TRequestConfig['requestDataOptional'] extends true
        ? (requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult
        : (requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult) & {
        requestConfig: TRequestConfig;
    };

const mockUrl_0_0_0_0 = 'http://yapi.po.mlamp.cn/mock/20' as any;
const devUrl_0_0_0_0 = '' as any;
const prodUrl_0_0_0_0 = '' as any;
const dataKey_0_0_0_0 = 'data' as any;

/**
 * 接口 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/602) 的 **请求类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /login`
 * @更新时间 `2021-03-14 18:33:36`
 */
export interface PostLoginRequest {
    /**
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 用户类型
     */
    userType: string;
}

/**
 * 接口 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/602) 的 **返回类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /login`
 * @更新时间 `2021-03-14 18:33:36`
 */
export interface PostLoginResponse {
    /**
     * 用户名
     */
    username: string;
    /**
     * 用户id
     */
    id: number;
}

/**
 * 接口 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/602) 的 **请求配置的类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /login`
 * @更新时间 `2021-03-14 18:33:36`
 */
type PostLoginRequestConfig = Readonly<
    RequestConfig<'http://yapi.po.mlamp.cn/mock/20', '', '', '/login', 'data', string, string, false>
>;

/**
 * 接口 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/602) 的 **请求配置**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /login`
 * @更新时间 `2021-03-14 18:33:36`
 */
const postLoginRequestConfig: PostLoginRequestConfig = {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: '/login',
    method: Method.POST,
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {}
};

/**
 * 接口 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/602) 的 **请求函数**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /login`
 * @更新时间 `2021-03-14 18:33:36`
 */
export const postLogin =
    makeRequest<PostLoginRequest, PostLoginResponse, PostLoginRequestConfig>(postLoginRequestConfig);

/**
 * 接口 [注销登陆↗](http://yapi.po.mlamp.cn/project/20/interface/api/610) 的 **请求类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /logout`
 * @更新时间 `2021-03-17 11:21:09`
 */
export interface PostLogoutRequest {}

/**
 * 接口 [注销登陆↗](http://yapi.po.mlamp.cn/project/20/interface/api/610) 的 **返回类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /logout`
 * @更新时间 `2021-03-17 11:21:09`
 */
export interface PostLogoutResponse {
    /**
     * 用户名
     */
    username: string;
}

/**
 * 接口 [注销登陆↗](http://yapi.po.mlamp.cn/project/20/interface/api/610) 的 **请求配置的类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /logout`
 * @更新时间 `2021-03-17 11:21:09`
 */
type PostLogoutRequestConfig = Readonly<
    RequestConfig<'http://yapi.po.mlamp.cn/mock/20', '', '', '/logout', 'data', string, string, true>
>;

/**
 * 接口 [注销登陆↗](http://yapi.po.mlamp.cn/project/20/interface/api/610) 的 **请求配置**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /logout`
 * @更新时间 `2021-03-17 11:21:09`
 */
const postLogoutRequestConfig: PostLogoutRequestConfig = {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: '/logout',
    method: Method.POST,
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {}
};

/**
 * 接口 [注销登陆↗](http://yapi.po.mlamp.cn/project/20/interface/api/610) 的 **请求函数**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `POST /logout`
 * @更新时间 `2021-03-17 11:21:09`
 */
export const postLogout =
    makeRequest<PostLogoutRequest, PostLogoutResponse, PostLogoutRequestConfig>(postLogoutRequestConfig);

/**
 * 接口 [获取用户信息↗](http://yapi.po.mlamp.cn/project/20/interface/api/618) 的 **请求类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `GET /getUserInfo`
 * @更新时间 `2021-03-17 11:39:19`
 */
export interface GetGetUserInfoRequest {}

/**
 * 接口 [获取用户信息↗](http://yapi.po.mlamp.cn/project/20/interface/api/618) 的 **返回类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `GET /getUserInfo`
 * @更新时间 `2021-03-17 11:39:19`
 */
export interface GetGetUserInfoResponse {
    /**
     * 用户名
     */
    username: string;
    /**
     * 用户类型
     */
    userType: string;
}

/**
 * 接口 [获取用户信息↗](http://yapi.po.mlamp.cn/project/20/interface/api/618) 的 **请求配置的类型**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `GET /getUserInfo`
 * @更新时间 `2021-03-17 11:39:19`
 */
type GetGetUserInfoRequestConfig = Readonly<
    RequestConfig<'http://yapi.po.mlamp.cn/mock/20', '', '', '/getUserInfo', 'data', string, string, true>
>;

/**
 * 接口 [获取用户信息↗](http://yapi.po.mlamp.cn/project/20/interface/api/618) 的 **请求配置**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `GET /getUserInfo`
 * @更新时间 `2021-03-17 11:39:19`
 */
const getGetUserInfoRequestConfig: GetGetUserInfoRequestConfig = {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: '/getUserInfo',
    method: Method.GET,
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {}
};

/**
 * 接口 [获取用户信息↗](http://yapi.po.mlamp.cn/project/20/interface/api/618) 的 **请求函数**
 *
 * @分类 [登录↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_149)
 * @请求头 `GET /getUserInfo`
 * @更新时间 `2021-03-17 11:39:19`
 */
export const getGetUserInfo =
    makeRequest<GetGetUserInfoRequest, GetGetUserInfoResponse, GetGetUserInfoRequestConfig>(
        getGetUserInfoRequestConfig
    );

/* prettier-ignore-end */
