import {
  SET_TOKEN,
  SET_AUTHENTICATED
} from './mutations.type'

// Initial state
const initialState = {
  token: null,
  authenticated: false
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {}

// Mutations
export const mutations = {
  [SET_TOKEN] (state, v) {
    state.token = v
  },
  [SET_AUTHENTICATED] (state, v) {
    state.authenticated = v
  }
}

// Getters
const getters = {
  token: (state) => {
    return state.token
  },
  authenticated: (state) => {
    return state.authenticated
  }
}

// Export all
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
