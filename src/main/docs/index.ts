import { notFound, serverError, unauthorized, badRequest, forbidden } from './components'
import { loginPath } from './paths/login-path'
import { signUpPath } from './paths/signup-path'
import { accountSchema, errorSchema, loginParamsSchema, signUpParamsSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'B3 - Ações campeãs',
    description: 'B3 - Relatório das ações com maior retorno anual desde 2000',
    version: '1.0.0',
    contact: {
      name: 'Silas Paixão',
      email: 'silas.paixao873@gmail.com',
      url: 'https://portfolio-silas.vercel.app/'
    }
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest: badRequest,
    serverError: serverError,
    unauthorized: unauthorized,
    notFound: notFound,
    forbidden: forbidden
  }
}
