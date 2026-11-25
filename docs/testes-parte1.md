# Testes da Parte 1

Data: 24/11/2026

## Ambiente

- Frontend: `http://localhost:5500`

## Como rodar

Inicie o LiveServer sobre index.html

## Testes da interface

| Teste | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|
| Adicionar um filme válido | Card aparece sem recarregar | Novo card é criado sem recarregar a página | Passou |
| Ano inválido | Erro visível e nada salvo | O modal continuou aberto e o navegador bloqueou o envio | Passou |
| Editar filme | Card correto muda | O título mudou para “Filme Teste UI Editado”, sem duplicar | Passou |
| Remover e cancelar | Filme continua | O filme continuou na lista | Passou |
| Remover e confirmar | Filme sai | O filme saiu e a lista voltou para 6 cards | Passou |
| Buscar “duna” | Apenas Duna | Apenas “Duna: Parte Dois” apareceu | Passou |
| Filtrar “Dropado” | Apenas Parasita | Apenas “Parasita” apareceu | Passou |
| Busca + filtro | Critérios combinam | Busca “duna” + filtro “Assistindo” retornou apenas Duna | Passou |
| Recarregar página | Lista persiste | A lista voltou com 6 cards | Passou |
| Fechar Modal | Esc e Cancelar fecham o modal | Ao pressionar Esc ou cancelar, o modal fecha sem salvar nada | Passou
| Primeira visita | Carragamento dos filmes iniciais | Os 6 filmes da seed aparecem como esperado | Passou