import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '@/plugins/feathers'

class User extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(data, options) {
    super(data, options)
  }

  static modelName = 'User'

  static instanceDefaults() {
    return {
      email: '',
      password: ''
    }
  }
}

const servicePath = 'users'
const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
