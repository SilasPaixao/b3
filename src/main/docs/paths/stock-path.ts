export const stockPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Ações'],
    summary: 'API para listar todas as ações',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/stocks'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Ações'],
    summary: 'API para criar uma enquete',
    description: 'Essa rota só pode ser executada por **administradores**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addStockParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso, mas sem dados para exibir'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
