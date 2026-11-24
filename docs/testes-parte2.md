# Testes da Parte 2

Data: 23/11/2026

## Ambiente

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

## Como rodar

Backend:

```bash
cd backend
cp .env.example .env
npm run seed
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Testes da API

| Teste | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|
| `GET /filmes` | 6 filmes | 6 filmes | Passou |
| `GET /filmes?status=quero` | 2 filmes | Interestelar e Cidade de Deus | Passou |
| `GET /filmes/1` | A Origem | A Origem | Passou |
| `GET /filmes/99` | 404 | 404 com erro em JSON | Passou |
| POST com nota 7 e status inválido | 400 com dois erros | 400 com dois erros | Passou |
| POST válido com `drop` | 201 | 201 com id 7 | Passou |
| PUT com nota/status inválidos | 400 | 400 com dois erros | Passou |
| PUT válido | 200 com id preservado | 200 com id 7 | Passou |
| DELETE existente | 204 | 204 | Passou |
| DELETE inexistente | 404 | 404 | Passou |
| CORS | Header de liberação | `Access-Control-Allow-Origin: *` | Passou |
| Persistência | Dados após reiniciar | Dados mantidos | Passou |

## Testes da interface

| Teste | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|
| Abrir o frontend | 6 cards | 6 cards | Passou |
| Adicionar filme | Card aparece sem recarregar | O card “Filme Teste UI” apareceu no fim da lista | Passou |
| Ano inválido | Erro visível e nada salvo | O modal continuou aberto e o navegador bloqueou o envio | Passou |
| Editar filme | Card correto muda | O título mudou para “Filme Teste UI Editado”, sem duplicar | Passou |
| Remover e cancelar | Filme continua | O filme continuou na lista | Passou |
| Remover e confirmar | Filme sai | O filme saiu e a lista voltou para 6 cards | Passou |
| Buscar “duna” | Apenas Duna | Apenas “Duna: Parte Dois” apareceu | Passou |
| Filtrar “Dropado” | Apenas Parasita | Apenas “Parasita” apareceu | Passou |
| Busca + filtro | Critérios combinam | Busca “duna” + filtro “Assistindo” retornou apenas Duna | Passou |
| Recarregar página | Lista persiste | A lista voltou com 6 cards | Passou |
| Backend indisponível | Mensagem de erro | Simulei falha de rede bloqueando `/filmes`; apareceu “Erro ao carregar os filmes.” | Passou |
| Backend disponível novamente | App volta a carregar | Após liberar a conexão e recarregar, a lista voltou com 6 cards | Passou |

## Build e typecheck

| Teste | Resultado |
|---|---|
| `cd frontend && npm run build` | Passou |
| `cd backend && npm run typecheck` | Passou |

## Clone/cópia limpa

Teste feito em uma cópia sem `node_modules`, `dist` e `.env`, a partir do branch atual.

Backend:

```bash
cd backend
npm ci
cp .env.example .env
npm run seed
npm run typecheck
npm run dev
```

Frontend:

```bash
cd frontend
npm ci
npm run build
npm run dev
```

Resultado:

```text
Passou. O seed gerou 6 filmes, a API respondeu com os 6 filmes,
o typecheck do backend passou e o build do frontend passou.
Repetir o teste após o merge da PR para a validação final.
```

## Observações

- O status `drop` foi mantido da Parte 1.
- Depois dos testes, rode `npm run seed` para restaurar os 6 filmes.