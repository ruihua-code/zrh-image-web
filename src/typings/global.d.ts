/**
 * 功能：重新定义全局变量
 * 作者：林政 Mizi
 * 日期：2020/12/30
 */

/**
 * fixed: TS2339: Property 'projectConf' does not exist on type 'Window & typeof globalThis'.
 * mizi.2020.12.30
 */
export {};
declare const window: Window;
declare global {
    interface Window {
        projectConf: Record<string, any>;
        basename: string
    }
}
