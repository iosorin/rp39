import Vuex from 'vuex'
import user from './modules/user'
import page from './modules/page'
import loading from './modules/loading'
import submitStatus from './modules/submitStatus'
import messages from './modules/messages'

let store

const initStore = () => {
  return store || (store = new Vuex.Store({
    modules: {
      user,
      page,
      loading,
      submitStatus,
      messages
    }
  }))
}

export default initStore
