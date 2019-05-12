import { DB } from '~/services/firebase'

const _db = DB.ref('messages')

class Message {
  constructor (html, text, user = null, id = null) {
    this.html = html
    this.text = text
    this.user = user
    this.id = id
  }
}

export default {
  state: {
    messages: []
  },
  mutations: {
    newMessage (state, payload) {
      state.messages.push(payload)
    },
    loadMessages (state, payload) {
      state.messages = payload
    }
  },
  actions: {
    async loadMessages ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const message = await _db.once('value')
        const messages = message.val()
        if (messages) {
          const messageArray = []
          Object.keys(messages).forEach(key => {
            const m = messages[key]
            messageArray.push(
              new Message(
                m.html,
                m.text,
                m.user,
                key
              )
            )
          })
          commit('loadMessages', messageArray)
        } else {
          commit('loadMessages', [])
        }
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async newMessage ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLocalLoad', true)
      try {
        const newMessage = new Message(
          payload.html,
          payload.text,
          getters.user.id
        )
        const message = await _db.push(newMessage)
        commit('newMessage', {
          ...newMessage,
          id: message.key
        })
        commit('setLocalLoad', false)
      } catch (error) {
        commit('setLocalLoad', false)
        commit('setError', error.message)
        throw error
      }
    },
    async deleteMessage ({ commit }, id) {
      commit('clearError')
      commit('setLocalLoad', true)
      try {
        await _db.child(id).remove()
        commit('setLocalLoad', false)
      } catch (error) {
        commit('setLocalLoad', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    messages: (state, getters) => !getters.guest ? state.messages.filter(m => m.user === getters.user.id) : []
  }
}
