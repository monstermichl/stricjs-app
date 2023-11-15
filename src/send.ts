import { json as jsonOpts, html as htmlOpts, status as statusCodes } from './options';
import { ResponseOptions, Context } from './types';
import { RedirectStatus, Status } from './types/basic';

/**
 * Type for everything that can be passed into `Response` constructor
 */
export type Readable = ConstructorParameters<typeof Response>[0];

/**
 * Send a response
 */
export const text = (d: Readable) => new Response(d);

const { stringify } = JSON;
/**
 * Send JSON response
 */
export const json = (d: object) =>
    new Response(stringify(d), jsonOpts);

/**
 * Send HTML response
 */
export const html = (d: Readable) =>
    new Response(d, htmlOpts);

const getFile = globalThis.Bun?.file;
/**
 * Send a path as response
 */
export const file = (path: string) =>
    new Response(getFile(path));

/**
 * Send response options only
 */
export const head = (init: ResponseOptions) =>
    new Response(null, init);

/**
 * Redirect to a specific location
 */
export const redirect = (Location: string, status: RedirectStatus) =>
    new Response(null, { headers: { Location }, status });

/**
 * Create a redirect function
 */
export const createLink = (Location: string, status: RedirectStatus) => {
    const options: ResponseOptions = {
        headers: { Location }, status
    };

    return () => new Response(null, options);
}

/**
 * Send only status
 */
export const status = (status: Status) =>
    new Response(null, statusCodes[status]);

/**
 * Send the context response
 */
export const ctx = (c: Context) => new Response(
    c.set.body, c.set
);
export default ctx;

/**
 * Context response set
 */
function ContextSet() { }

ContextSet.prototype = Object.create(null);
ContextSet.prototype.headers = Object.create(null);
ContextSet.prototype.status = 200;
ContextSet.prototype.statusText = '';
ContextSet.prototype.body = null;

interface ContextSet extends ResponseOptions { };

/**
 * Create a context set
 */
export const createContext = (): ResponseOptions => new ContextSet;
export { ContextSet };
