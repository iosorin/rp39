export default {
  state: {
    submitStatus: null,
    timeout: 1850
  },
  mutations: {
    setSubmitStatus (state, payload) {
      state.submitStatus = payload
    }
  },
  actions: {
    setSubmitStatus ({ commit }, payload) {
      commit('setSubmitStatus', payload)
    },
    clearSubmitStatus ({ commit }) {
      commit('setSubmitStatus', null)
    }
  },
  getters: {
    submitStatus: (state) => state.submitStatus,
    submitTimeout: (state) => state.timeout
  }
}
