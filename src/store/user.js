import {
  SET_ONE,
  SET_META,
  SET_AUTH_USER
} from './mutations.type'

import {
  SAVE,
  DELETE,
  FETCH_ONE,
  FETCH_AUTH_USER
} from './actions.type'

import User from '../models/User'

// Initial state
const initialState = {
  user: {},
  authUser: {},
  meta: {}
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [FETCH_ONE] (context, slug) {
    const item = await User.$find(slug)
    context.commit(SET_ONE, item)
    return item
  },
  async [FETCH_AUTH_USER] (context) {
    const item = await User.custom('users/me').$first()
    context.commit(SET_AUTH_USER, item)
    return item
  },
  async [SAVE] (context, payload) {
    return await (new User(payload)).save()
  },
  async [DELETE] (context, payload) {
    return await (new User(payload)).delete()
  }
}

// Mutations
export const mutations = {
  [SET_ONE] (state, item) {
    state.user = item
  },
  [SET_AUTH_USER] (state, item) {
    state.authUser = item
  },
  [SET_META] (state, item) {
    state.meta = item
  }
}

// Getters
export const getters = {
  user: (state) => {
    return state.user
  },
  authUser: (state) => {
    return state.authUser
  },
  meta: (state) => {
    return state.meta
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
