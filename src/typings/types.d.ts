/**
 * 基本自定义类型
 * 作者: 林政
 * 日期：2020/12/31
 */
declare type DataRow = Record<string, any>;

// EventTarget抽象程度大于Element, but 我们通常使用 target 为 Element
declare interface DOMEvent<T extends EventTarget> extends Event {
    target: T;
}

// 通用接口返回类型
declare interface ApiResponse<T> {
    data: T;
    statusCode: number;
    message: string;
}
