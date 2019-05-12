export default {
  state: {
    page: 'index'
  },
  mutations: {
    updatePage (state, payload) {
      state.page = payload
    }
  },
  actions: {
    updatePage ({ commit }, payload) {
      commit('updatePage', payload)
    }
  },
  getters: {
    page: (state) => state.page
  }
}
