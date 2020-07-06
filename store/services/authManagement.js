import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '@/plugins/feathers'

class AuthManagement extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(data, options) {
    super(data, options)
  }

  static modelName = 'AuthManagement'

  static instanceDefaults() {
    return {}
  }
}

const servicePath = 'authManagement'
const servicePlugin = makeServicePlugin({
  Model: AuthManagement,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
