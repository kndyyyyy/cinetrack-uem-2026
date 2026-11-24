# API CineTrack

API do CineTrack feita com Node.js, Express e TypeScript.
Os dados ficam em `backend/data/filmes.json`.

## Endereço

```text
http://localhost:3000
```

## Formato

- Respostas em JSON.
- CORS habilitado.
- Status aceitos: `assistido`, `assistindo`, `quero`, `drop`.
- Nota: 1 a 5.
- Ano: 1888 a 2030.

## Campos do filme

| Campo | Tipo | Obrigatório |
|---|---|---|
| `id` | number | gerado pela API |
| `titulo` | string | sim |
| `ano` | number | sim |
| `genero` | string | não |
| `poster` | string | não |
| `nota` | number | sim |
| `status` | string | sim |
| `comentario` | string | não |

## GET /filmes

Retorna todos os filmes.

Filtro opcional:

```bash
curl "http://localhost:3000/filmes?status=quero"
```

Resposta: `200 OK` com a lista.

## GET /filmes/:id

Retorna um filme pelo id.

```bash
curl http://localhost:3000/filmes/1
```

Respostas:

- `200 OK`: filme encontrado.
- `404 Not Found`:

```json
{ "erro": "Filme não encontrado" }
```

## POST /filmes

Cria um filme. O id é gerado pela API.

```bash
curl -i -X POST http://localhost:3000/filmes \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Duna: Parte Dois",
    "ano": 2024,
    "genero": "Ficção científica",
    "poster": "",
    "nota": 4,
    "status": "assistindo",
    "comentario": ""
  }'
```

Respostas:

- `201 Created`: filme criado.
- `400 Bad Request`: dados inválidos.

```json
{
  "erros": [
    "nota deve estar entre 1 e 5",
    "status inválido"
  ]
}
```

## PUT /filmes/:id

Atualiza um filme. O id não muda.

```bash
curl -i -X PUT http://localhost:3000/filmes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "A Origem",
    "ano": 2010,
    "genero": "Ficção científica",
    "poster": "",
    "nota": 5,
    "status": "assistido",
    "comentario": "Favorito"
  }'
```

Respostas:

- `200 OK`: filme atualizado.
- `400 Bad Request`: dados inválidos.
- `404 Not Found`: filme não encontrado.

## DELETE /filmes/:id

Remove um filme.

```bash
curl -i -X DELETE http://localhost:3000/filmes/1
```

Respostas:

- `204 No Content`: removido.
- `404 Not Found`: filme não encontrado.

## CORS

O backend responde com:

```text
Access-Control-Allow-Origin: *
```

Isso permite o acesso do frontend em desenvolvimento.