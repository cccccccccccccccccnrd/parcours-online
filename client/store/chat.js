export const state = () => ({
  messages: [],
  name: '',
  status: null,
  logins: {}
})

export const actions = {
  init (context) {
    const name = localStorage.getItem('parcours-online-name')

    if (name) {
      context.commit('setUsername', name)
    }
  }
}

export const mutations = {
  insert(state, msg) {
    state.messages.push(msg)
  },
  remove(state) {
    const found = state.messages.find((m) => m.payload.location === 'global')

    if (found) {
      const index = state.messages.indexOf(found)
      state.messages.splice(index, 1)
    }
  },
  setUsername(state, name) {
    localStorage.setItem('parcours-online-name', name)
    state.name = name
  },
  removeUsername(state) {
    localStorage.removeItem('parcours-online-name')
    state.name = ''
  },
  setStatus(state, status) {
    state.status = status
  },
  setLogins(state, logins) {
    state.logins = logins
  },
}

export const getters = {
  all (state) {
    return state.messages
  },
  username(state) {
    return state.name
  },
  messages: (state) => (id) => {
    return state.messages.filter((message) => id === message.id)
  },
  status(state) {
    return state.status
  },
  logins(state) {
    return Object.values(state.logins)
  },
}
