import App from '@stricjs/app';
import { status } from '@stricjs/app/send';

new App({
    routes: [import.meta.dir + '/src'],
    fallback: () => status(404),
    ws: true
}).build(true);
