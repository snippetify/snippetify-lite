import {
  SAVE
} from './actions.type'

import Vote from '../models/Vote'

// Initial state
const initialState = {}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [SAVE] (context, payload) {
    const model = new Vote(payload)
    return await model.save()
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
