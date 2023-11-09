/**
 * Send text and blob.
 */
export const text = (d: any) => new Response(d);

const jsonOpts = {
    headers: {
        'Content-Type': 'application/json'
    }
}, { stringify } = JSON;

/**
 * Send JSON response
 */
export const json = (d: any) => new Response(stringify(d), jsonOpts);

const getFile = globalThis.Bun.file;
/**
 * Send a path as response
 */
export const file = (path: string) => new Response(getFile(path));