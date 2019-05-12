import { auth, reauthenticate } from '~/services/firebase'

class User {
  constructor (id, email, username, password) {
    this.id = id
    this.email = email
    this.username = username || email
  }
}

export default {
  state: {
    user: null,
    userPassword: null
  },
  mutations: {
    setUser (state, { user, password }) {
      state.user = user || null
      state.userPassword = password || null
    },
    updateUser (state, user) {
      state.user = user
    },
    updatePassword (state, password) {
      state.userPassword = password
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const u = await auth.createUserWithEmailAndPassword(email, password)
        const user = new User(u.user.uid, email, u.user.displayName)
        localStorage.setItem('simpljw', password)
        commit('setUser', { user, password })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const u = await auth.signInWithEmailAndPassword(email, password)
        const user = new User(u.user.uid, email, u.user.displayName)
        localStorage.setItem('simpljw', password)
        commit('setUser', { user, password })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    loggedUser ({ commit }, payload) {
      const user = new User(payload.uid, payload.email, payload.displayName)
      const password = localStorage.getItem('simpljw') || null
      commit('setUser', { user, password })
    },
    logoutUser ({ commit }) {
      auth.signOut()
      localStorage.removeItem('simpljw')
      commit('setUser', {})
    },
    async updateUserPassword ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const currentUser = auth.currentUser
        const currentPassword = getters.userPassword
        reauthenticate(currentPassword).then(() => {
          currentUser.updatePassword(payload).then(() => {
            commit('updatePassword', payload)
            localStorage.setItem('simpljw', payload)
            commit('setLoading', false)
          })
            .catch((e) => { console.log(e) })
        })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async updateUserEmailAndName ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const currentUser = auth.currentUser
        const newEmail = payload.email
        const newUserName = payload.username

        reauthenticate(getters.userPassword).then(() => {
          currentUser.updateEmail(newEmail)
            .then(() => {
              currentUser.updateProfile({
                displayName: newUserName
              })
            })
            .then(() => {
              const user = new User(currentUser.uid, newEmail, newUserName)
              commit('updateUser', user)
              commit('setLoading', false)
            })
            .catch((e) => {
              commit('setLoading', false)
              commit('setSubmitStatus', e.message)
              console.log(e)
            })
        })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    user: (state) => state.user,
    guest: (state) => state.user === null,
    userName: (state) => state.user.username,
    userEmail: (state) => state.user.email,
    userPassword: (state) => state.userPassword
  }
}
