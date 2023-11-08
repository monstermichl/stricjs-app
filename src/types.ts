import { Context as RadixContext } from 'wint-js/types/types';

/**
 * Represent a request object
 */
export interface Context<Params = any> extends RadixContext, Omit<Request, 'url' | 'method'> {
    /**
     * Parsed path parameters
     */
    params: Params;

    /**
     * Send other data
     */
    set: ResponseInit;

    /**
     * Current request URL
     */
    url: string;

    /**
     * Current request method
     */
    method: string;
}

/**
 * Extract parameters from a path
 */
export type Params<T extends string> = T extends `${infer Segment}/${infer Rest}`
    ? (Segment extends `:${infer Param}`
        ? (Rest extends `*` ? { [K in Param]: string } : { [K in Param]: string } & Params<Rest>)
        : {}) & Params<Rest>
    : T extends `:${infer Param}`
    ? { [K in Param]: string }
    : T extends `*`
    ? { '*': string }
    : {};

/**
 * A request handler
 */
export interface Handler<Path extends string = any> {
    (c: Context<Params<Path>>): any;
}

