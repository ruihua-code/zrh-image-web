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

const mockUrl_1_0_0_0 = 'http://yapi.po.mlamp.cn/mock/20' as any;
const devUrl_1_0_0_0 = '' as any;
const prodUrl_1_0_0_0 = '' as any;
const dataKey_1_0_0_0 = 'data' as any;

/**
 * 接口 [获取列表↗](http://yapi.po.mlamp.cn/project/20/interface/api/682) 的 **请求类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `GET /todos`
 * @更新时间 `2021-04-07 20:17:47`
 */
export interface GetTodosRequest {}

/**
 * 接口 [获取列表↗](http://yapi.po.mlamp.cn/project/20/interface/api/682) 的 **返回类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `GET /todos`
 * @更新时间 `2021-04-07 20:17:47`
 */
export type GetTodosResponse = GetTodosResponseItem[];

export interface GetTodosResponseItem {
    id: number;
    text: string;
    completed: boolean;
}

/**
 * 接口 [获取列表↗](http://yapi.po.mlamp.cn/project/20/interface/api/682) 的 **请求配置的类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `GET /todos`
 * @更新时间 `2021-04-07 20:17:47`
 */
type GetTodosRequestConfig = Readonly<
    RequestConfig<'http://yapi.po.mlamp.cn/mock/20', '', '', '/todos', 'data', string, string, true>
>;

/**
 * 接口 [获取列表↗](http://yapi.po.mlamp.cn/project/20/interface/api/682) 的 **请求配置**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `GET /todos`
 * @更新时间 `2021-04-07 20:17:47`
 */
const getTodosRequestConfig: GetTodosRequestConfig = {
    mockUrl: mockUrl_1_0_0_0,
    devUrl: devUrl_1_0_0_0,
    prodUrl: prodUrl_1_0_0_0,
    path: '/todos',
    method: Method.GET,
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_1_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {}
};

/**
 * 接口 [获取列表↗](http://yapi.po.mlamp.cn/project/20/interface/api/682) 的 **请求函数**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `GET /todos`
 * @更新时间 `2021-04-07 20:17:47`
 */
export const getTodos = makeRequest<GetTodosRequest, GetTodosResponse, GetTodosRequestConfig>(getTodosRequestConfig);

/**
 * 接口 [删除↗](http://yapi.po.mlamp.cn/project/20/interface/api/690) 的 **请求类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `DELETE /todos`
 * @更新时间 `2021-04-07 20:17:55`
 */
export interface DeleteTodosRequest {
    id: number;
}

/**
 * 接口 [删除↗](http://yapi.po.mlamp.cn/project/20/interface/api/690) 的 **返回类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `DELETE /todos`
 * @更新时间 `2021-04-07 20:17:55`
 */
export type DeleteTodosResponse = string;

/**
 * 接口 [删除↗](http://yapi.po.mlamp.cn/project/20/interface/api/690) 的 **请求配置的类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `DELETE /todos`
 * @更新时间 `2021-04-07 20:17:55`
 */
type DeleteTodosRequestConfig = Readonly<
    RequestConfig<'http://yapi.po.mlamp.cn/mock/20', '', '', '/todos', 'data', string, string, false>
>;

/**
 * 接口 [删除↗](http://yapi.po.mlamp.cn/project/20/interface/api/690) 的 **请求配置**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `DELETE /todos`
 * @更新时间 `2021-04-07 20:17:55`
 */
const deleteTodosRequestConfig: DeleteTodosRequestConfig = {
    mockUrl: mockUrl_1_0_0_0,
    devUrl: devUrl_1_0_0_0,
    prodUrl: prodUrl_1_0_0_0,
    path: '/todos',
    method: Method.DELETE,
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_1_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {}
};

/**
 * 接口 [删除↗](http://yapi.po.mlamp.cn/project/20/interface/api/690) 的 **请求函数**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `DELETE /todos`
 * @更新时间 `2021-04-07 20:17:55`
 */
export const deleteTodos =
    makeRequest<DeleteTodosRequest, DeleteTodosResponse, DeleteTodosRequestConfig>(deleteTodosRequestConfig);

/**
 * 接口 [新增↗](http://yapi.po.mlamp.cn/project/20/interface/api/698) 的 **请求类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `POST /todos`
 * @更新时间 `2021-04-07 20:18:11`
 */
export interface PostTodosRequest {
    text: string;
    completed: boolean;
}

/**
 * 接口 [新增↗](http://yapi.po.mlamp.cn/project/20/interface/api/698) 的 **返回类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `POST /todos`
 * @更新时间 `2021-04-07 20:18:11`
 */
export type PostTodosResponse = string;

/**
 * 接口 [新增↗](http://yapi.po.mlamp.cn/project/20/interface/api/698) 的 **请求配置的类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `POST /todos`
 * @更新时间 `2021-04-07 20:18:11`
 */
type PostTodosRequestConfig = Readonly<
    RequestConfig<'http://yapi.po.mlamp.cn/mock/20', '', '', '/todos', 'data', string, string, false>
>;

/**
 * 接口 [新增↗](http://yapi.po.mlamp.cn/project/20/interface/api/698) 的 **请求配置**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `POST /todos`
 * @更新时间 `2021-04-07 20:18:11`
 */
const postTodosRequestConfig: PostTodosRequestConfig = {
    mockUrl: mockUrl_1_0_0_0,
    devUrl: devUrl_1_0_0_0,
    prodUrl: prodUrl_1_0_0_0,
    path: '/todos',
    method: Method.POST,
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_1_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {}
};

/**
 * 接口 [新增↗](http://yapi.po.mlamp.cn/project/20/interface/api/698) 的 **请求函数**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `POST /todos`
 * @更新时间 `2021-04-07 20:18:11`
 */
export const postTodos =
    makeRequest<PostTodosRequest, PostTodosResponse, PostTodosRequestConfig>(postTodosRequestConfig);

/**
 * 接口 [编辑↗](http://yapi.po.mlamp.cn/project/20/interface/api/706) 的 **请求类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `PUT /todos`
 * @更新时间 `2021-04-07 20:18:30`
 */
export interface PutTodosRequest {
    id: number;
    text: string;
    completed: boolean;
}

/**
 * 接口 [编辑↗](http://yapi.po.mlamp.cn/project/20/interface/api/706) 的 **返回类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `PUT /todos`
 * @更新时间 `2021-04-07 20:18:30`
 */
export type PutTodosResponse = string;

/**
 * 接口 [编辑↗](http://yapi.po.mlamp.cn/project/20/interface/api/706) 的 **请求配置的类型**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `PUT /todos`
 * @更新时间 `2021-04-07 20:18:30`
 */
type PutTodosRequestConfig = Readonly<
    RequestConfig<'http://yapi.po.mlamp.cn/mock/20', '', '', '/todos', 'data', string, string, false>
>;

/**
 * 接口 [编辑↗](http://yapi.po.mlamp.cn/project/20/interface/api/706) 的 **请求配置**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `PUT /todos`
 * @更新时间 `2021-04-07 20:18:30`
 */
const putTodosRequestConfig: PutTodosRequestConfig = {
    mockUrl: mockUrl_1_0_0_0,
    devUrl: devUrl_1_0_0_0,
    prodUrl: prodUrl_1_0_0_0,
    path: '/todos',
    method: Method.PUT,
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_1_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {}
};

/**
 * 接口 [编辑↗](http://yapi.po.mlamp.cn/project/20/interface/api/706) 的 **请求函数**
 *
 * @分类 [学习示例↗](http://yapi.po.mlamp.cn/project/20/interface/api/cat_157)
 * @请求头 `PUT /todos`
 * @更新时间 `2021-04-07 20:18:30`
 */
export const putTodos = makeRequest<PutTodosRequest, PutTodosResponse, PutTodosRequestConfig>(putTodosRequestConfig);

/* prettier-ignore-end */
