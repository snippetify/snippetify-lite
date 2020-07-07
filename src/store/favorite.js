import {
  SAVE,
  DELETE
} from './actions.type'

import Favorite from '../models/Favorite'

// Initial state
const initialState = { }

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [SAVE] (context, payload) {
    const model = new Favorite(payload)
    return await model.save()
  },
  async [DELETE] (context, payload) {
    const model = new Favorite(payload)
    return await model.delete()
  }
}

// Mutations
export const mutations = {}

// Getters
export const getters = {}

// Export all
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
