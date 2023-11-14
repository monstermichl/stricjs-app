/// <reference types='bun-types' />
import { existsSync, rmSync } from 'fs';

const root = import.meta.dir;

// Generating types and lib
const typeDir = root + '/types';
if (existsSync(typeDir))
    rmSync(typeDir, { recursive: true });

const libDir = root + '/lib';
if (existsSync(libDir))
    rmSync(libDir, { recursive: true });

Bun.build({
    format: 'esm',
    target: 'bun',
    outdir: libDir,
    minify: true,
    entrypoints: [
        './src/index.ts', './src/send.ts',
        './src/parser.ts', './src/stream.ts',
        './src/options.ts'
    ]
});

// Build type declarations
Bun.spawn(['bun', 'x', 'tsc', '--outdir', typeDir], { stdout: 'inherit' });
