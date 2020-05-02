export const state = () => ({
  isPopUpOpen: false,
  project: null
})

export const mutations = {
  togglePopUp(state, project) {
    state.isPopUpOpen = !state.isPopUpOpen
    state.project = project
  }
}

export const getters = {
  isPopUpOpen (state) {
    return state.isPopUpOpen
  },
  project (state) {
    return state.project
  }
}
