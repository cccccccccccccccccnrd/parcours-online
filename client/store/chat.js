export const state = () => ({
  messages: [{
    id: 'WOW1',
    payload: {
      content: 'Hi, how are you?',
      name: 'Computer',
      timestamp: 1587134971445
    }
  }],
  name: ''
})

export const actions = {
  init (context) {
    const name = localStorage.getItem('parcours-online-name')
    console.log(name)

    if (name) {
      context.commit('setUsername', name)
    }
  }
}

export const mutations = {
  insert(state, msg) {
    state.messages.push(msg)
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
  }
}
