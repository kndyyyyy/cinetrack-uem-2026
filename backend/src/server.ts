import express from 'express';
import morgan from 'morgan';
import { gerarId, lerFilmes, salvarFilmes} from './db.js';
import cors from 'cors';
import type { Filme } from './types.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

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
  const dados = req.body;

  if (!dados.titulo || !dados.ano) {
    return res.status(400).json({ erro: 'Dados obrigatórios' });
  }

  const lista = lerFilmes();
  const novo = { id: gerarId(lista), ...dados };

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

  lista[i] = { ...lista[i], ...req.body, id };

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

