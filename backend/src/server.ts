import express from 'express';
import morgan from 'morgan';
import { gerarId, lerFilmes, salvarFilmes} from './db.js';
import cors from 'cors';
import { STATUS } from './types.js';
import type { Filme, FilmeInput, Status } from './types.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

function statusValido(status: unknown): status is Status {
  return typeof status === 'string' &&
    (STATUS as readonly string[]).includes(status);
}

function validarFilme(dados: Partial<FilmeInput>): string[] {
  const erros: string[] = [];

  if (!dados.titulo) {
    erros.push('titulo obrigatório');
  }

  const ano = Number(dados.ano);

  if (!dados.ano) {
    erros.push('ano obrigatório');
  } else if (!Number.isFinite(ano) || ano < 1888 || ano > 2030) {
    erros.push('ano deve estar entre 1888 e 2030');
  }

  const nota = Number(dados.nota);

  if (!Number.isFinite(nota) || nota < 1 || nota > 5) {
    erros.push('nota deve estar entre 1 e 5');
  }

  if (!statusValido(dados.status)) {
    erros.push('status inválido');
  }

  return erros;
}

app.get('/filmes', (req, res) => {
  const status = typeof req.query.status === 'string'
    ? req.query.status
    : undefined;

  let filmes = lerFilmes();

  if (status && status !== 'todos') {
    filmes = filmes.filter((filme) => filme.status === status);
  }

  res.json(filmes);
});

app.get('/filmes/:id', (req, res) => {
  const id = Number(req.params.id);
  const filme = lerFilmes().find((item) => item.id === id);

  if (!filme) {
    return res.status(404).json({ erro: 'Filme não encontrado' });
  }

  res.json(filme);
});

app.post('/filmes', (req, res) => {
  const dados = req.body as Partial<FilmeInput>;
  const erros = validarFilme(dados);

  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  const lista = lerFilmes();

  const novo: Filme = {
    id: gerarId(lista),
    titulo: String(dados.titulo),
    ano: Number(dados.ano),
    genero: String(dados.genero ?? ''),
    poster: String(dados.poster ?? ''),
    nota: Number(dados.nota),
    status: dados.status as Status,
    comentario: String(dados.comentario ?? '')
  };

  lista.push(novo);
  salvarFilmes(lista);

  res.status(201).json(novo);
});

app.put('/filmes/:id', (req, res) => {
  const id = Number(req.params.id);
  const lista = lerFilmes();
  const i = lista.findIndex((filme) => filme.id === id);

  if (i === -1) {
    return res.status(404).json({ erro: 'Filme não encontrado' });
  }

  const atualizado: Filme = {
    ...lista[i],
    ...req.body,
    id
  };

  const erros = validarFilme(atualizado);

  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  lista[i] = atualizado;
  salvarFilmes(lista);

  res.json(lista[i]);
});

app.delete('/filmes/:id', (req, res) => {
  const id = Number(req.params.id);
  const lista = lerFilmes();

  if (!lista.some((filme) => filme.id === id)) {
    return res.status(404).json({ erro: 'Filme não encontrado' });
  }

  salvarFilmes(lista.filter((filme) => filme.id !== id));

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`API CineTrack na porta ${PORT}`);
});
