import {
  initAuth,
  hydrateApi,
  models,
  makeAuthPlugin
} from '@/plugins/feathers'

const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map((modulePath) => requireModule(modulePath).default)

const auth = makeAuthPlugin({
  userService: 'users',
  state: {
    publicPages: ['login']
  },
  actions: {
    onInitAuth({ state, dispatch }, payload) {
      if (payload) {
        dispatch('authenticate', {
          strategy: 'jwt',
          accessToken: state.accessToken
        })
          .then((result) => {
            // handle success like a boss
            console.log('logged in')
          })
          .catch((error) => {
            // handle error like a boss
            console.log(error)
          })
      }
    }
  }
})

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    })
  },
  nuxtClientInit({ state, dispatch }, ctx) {
    hydrateApi({ api: models.api })
    if (state.auth.accessToken) {
      return dispatch('auth/onInitAuth', state.auth.payload)
    }
  }
}

export const plugins = [...servicePlugins, auth]
