export const state = () => ({
  cursors: []
})

export const mutations = {
  update (state, cursor) {
    const existing = state.cursors.find((entry) => entry.id === cursor.id)

    if (existing && cursor.x === 'static' && cursor.y === 'static') {
      cursor.x = existing.x
      cursor.y = existing.y
    }

    if (existing) {
      const index = state.cursors.indexOf(existing)
      state.cursors.splice(index, 1)
    } else {
      console.log(`${ cursor.id } joined`)
    }

    state.cursors.push(cursor)
  },
  remove (state, id) {
    const existing = state.cursors.find((entry) => entry.id === id)

    if (existing) {
      const index = state.cursors.indexOf(existing)
      state.cursors.splice(index, 1)
      console.log(`${ id } left`)
    } else {
      console.log(`cursor ${ id } not found, could not remove`)
    }
  }
}

export const getters = {
  all (state) {
    return state.cursors
  }
}
