# Listar Ações campeãs

> ## Caso de sucesso

1. ⛔️  Recebe uma requisição do tipo **GET** na rota **/api/stocks**
2. ⛔️  Valida se a requisição foi feita por um **usuário**
3. ⛔️  Busca demonstração por **ano** ou **nome**, dependendo da query "q="
4. ⛔️  Busca a demonstração de todos os anos se não for fornecido nenhum parâmetro na query
5. ⛔️  Retorna **204** se não tiver nenhuma demonstração
6. ⛔️  Retorna **200** com os dados da demonstração anual

> ## Exceções

1. ⛔️  Retorna erro **404** se a API não existir
2. ⛔️  Retorna erro **403** se não for um usuário
3. ⛔️  Retorna erro **500** se der erro ao tentar listar a demonstração