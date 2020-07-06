import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import rest from '@feathersjs/rest-client'
import { iff, discard } from 'feathers-hooks-common'
import axios from 'axios'
import feathersVuex, { initAuth, hydrateApi } from 'feathers-vuex'
import { CookieStorage } from 'cookie-storage'

const restClient = rest('http://localhost:3030')

const feathersClient = feathers()
  .configure(restClient.axios(axios))
  .configure(auth({ storage: new CookieStorage() }))
  .hooks({
    before: {
      all: [
        iff(
          (context) => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp')
        )
      ]
    }
  })

export default feathersClient

const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  FeathersVuex
} = feathersVuex(feathersClient, {
  serverAlias: 'api',
  enableEvents: process.client
})

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  FeathersVuex,
  initAuth,
  hydrateApi
}
