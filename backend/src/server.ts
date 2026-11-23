import express from 'express';
import morgan from 'morgan';
import { lerFilmes } from './db.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(morgan('dev'));
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


app.listen(PORT, () => {
  console.log(`API CineTrack na porta ${PORT}`);
});