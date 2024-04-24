# Adiciona ação campeã do ano

> ## Caso de sucesso

1. ✅  Recebe uma requisição do tipo **POST** na rota **/api/stocks**
2. ⛔️  Valida se a requisição foi feita por um **admin**
3. ✅  Valida dados obrigatórios **stock** e **year**
4. ✅  **Salva no BD** a ação (stock)
5. ✅  Retorna **204**, sem dados

> ## Exceções

1. ✅  Retorna erro **404** se a API não existir
2. ⛔️  Retorna erro **403** se o usuário não for admin
3. ✅  Retorna erro **400** se stock ou year não forem fornecidos pelo client
4. ✅  Retorna erro **500** se der erro ao tentar salvar no BD