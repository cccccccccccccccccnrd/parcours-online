export const state = () => ({
  messages: [],
  name: ''
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
    state.messages.shift()
  },
  setUsername(state, name) {
    localStorage.setItem('parcours-online-name', name)
    state.name = name
  },
  removeUsername(state) {
    localStorage.removeItem('parcours-online-name')
    state.name = ''
  }
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
  }
}
