export const state = () => ({
  socket: null,
  id: null
})

export const actions = {
  init (context) {
    const url = window.location.hostname === 'localhost' ? 'ws://localhost:2627' : 'wss://cnrd.computer/gallery-ws'
    context.commit('setSocket', new WebSocket(url))
    context.commit('setId', `WOW${ Date.now() }`)
  },
  send (context, [type, payload]) {
    const msg = {
      type: type,
      id: context.getters.id,
      payload: payload
    }

    if (context.getters.socket) {
      context.getters.socket.send(JSON.stringify(msg))
    } else {
      console.log('socket not found on store state, re-mount the component?')
    }
  }
}

export const mutations = {
  setSocket (state, socket) {
    state.socket = socket
  },
  setId (state, id) {
    state.id = id
  }
}

export const getters = {
  socket (state) {
    return state.socket
  },
  id (state) {
    return state.id
  }
}
