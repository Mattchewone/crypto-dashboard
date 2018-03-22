import Vuex from 'vuex'
import feathersClient from './feathers-client'
import feathersVuex from 'feathers-vuex'

const { service } = feathersVuex(feathersClient, { idField: '_id' })

const createStore = () => {
  return new Vuex.Store({
    plugins: [
      service('portfolios')
    ]
  })
}

export default createStore
