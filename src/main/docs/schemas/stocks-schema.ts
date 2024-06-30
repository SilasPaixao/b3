export const stocksSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
  required: ['id', 'year', 'stock', 'acronym', 'profit']
}