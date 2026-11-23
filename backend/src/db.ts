import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Filme } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ARQUIVO = path.join(__dirname, '..', 'data', 'filmes.json');

export function lerFilmes(): Filme[] {
  return JSON.parse(fs.readFileSync(ARQUIVO, 'utf8')) as Filme[];
}

export function salvarFilmes(filmes: Filme[]): void {
  fs.mkdirSync(path.dirname(ARQUIVO), { recursive: true });
  fs.writeFileSync(ARQUIVO, JSON.stringify(filmes, null, 2), 'utf8');
}

export function gerarId(filmes: Filme[]): number {
  return filmes.length > 0
    ? Math.max(...filmes.map((filme) => filme.id)) + 1
    : 1;
}