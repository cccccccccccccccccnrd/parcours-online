export const state = () => ({
  isPopUpOpen: false,
  location: 'global',
  project: null
})

export const actions = {
  openProject(context, project) {
    console.log(project)
    context.commit('setProject', project)
    context.commit('setLocation', project.id)
    context.commit('togglePopUp')
  },
  closeProject(context) {
    context.commit('setProject', null)
    context.commit('setLocation', 'global')
    context.commit('togglePopUp')
  }
}

export const mutations = {
  setProject(state, project) {
    state.project = project
  },
  setLocation(state, location) {
    state.location = location
  },
  togglePopUp(state) {
    state.isPopUpOpen = !state.isPopUpOpen
  }
}

export const getters = {
  isPopUpOpen (state) {
    return state.isPopUpOpen
  },
  project (state) {
    return state.project
  },
  location (state) {
    return state.location
  }
}
