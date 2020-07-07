export const state = () => ({
  isPopUpOpen: false,
  isMapOpen: true,
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
    if (project) {
      document.title = `KISDparcours — ${ project.title }`
      window.history.replaceState(null, `KISDparcours — ${ project.title }`, `?graduate=${ project.id.match(/[^\d]+/g)[0].slice(0, -1) }`)
    } else {
      document.title = 'KISDparcours'
      window.history.replaceState(null, 'KISDparcours', '')
    }
    state.project = project
  },
  setLocation(state, location) {
    state.location = location
  },
  togglePopUp(state) {
    state.isPopUpOpen = !state.isPopUpOpen
  },
  toggleMap(state) {
    state.isMapOpen = !state.isMapOpen
  }
}

export const getters = {
  isPopUpOpen (state) {
    return state.isPopUpOpen
  },
  isMapOpen (state) {
    return state.isMapOpen
  },
  project (state) {
    return state.project
  },
  location (state) {
    return state.location
  }
}
