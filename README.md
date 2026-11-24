# CineTrack

Projeto da disciplina de Programação de Sistemas Web (9907/34), do 6º semestre da Universidade Estadual de Maringá (UEM).

## Integrantes

| Nome | RA |
|---|---|
| Arthur Kendy Nishimuta | 139099 |
| Vitor Martins Bispo | 138475 |

## Requisitos

- Node.js e npm instalados.

## Como executar

Abra dois terminais na raiz do repositório.

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

O backend será iniciado em `http://localhost:3000`. Mantenha esse terminal aberto.

### Frontend

No segundo terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra no navegador o endereço exibido pelo Vite (normalmente `http://localhost:5173`).
O frontend usa `http://localhost:3000` como endereço padrão da API. Para usar outra URL,
defina `VITE_API_URL` no ambiente do frontend antes de iniciar o Vite.

## Persistência

Os filmes são armazenados em `backend/data/filmes.json`. Para restaurar os seis filmes de
exemplo, execute `npm run seed` no diretório `backend`. O arquivo `backend/.env` é local
e não deve ser enviado ao repositório; use `backend/.env.example` como modelo.

## Documentação

- [API](docs/api.md)
- [Testes da Parte 2](docs/testes-parte2.md)
