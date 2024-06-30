export const addStockParamsSchema = {
  type: 'object',
  properties: {
    year: {
      type: 'string'
    },
    stock: {
      type: 'string'
    },
    acronym: {
      type: 'string'
    },
    profit: {
      type: 'string'
    }
  },
  required: ['year', 'stock', 'acronym', 'profit']
}