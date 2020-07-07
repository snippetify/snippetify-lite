import {
  SET_ONE,
  SET_MANY,
  SET_META,
  SET_FAVORITE
} from './mutations.type'

import {
  SAVE,
  DELETE,
  FETCH_ONE,
  FETCH_MANY,
  FETCH_FAVORITE
} from './actions.type'

import Tag from '../models/Tag'

// Initial state
const initialState = {
  tag: {},
  tags: [],
  meta: {}
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [FETCH_MANY] (context, payload = {}) {
    const builder = this.$myUtils.prepareQueryBuilder(new Tag(), payload) // Prepare query by adding filter and sorting
    const res = await builder.get()
    context.commit(SET_META, res.meta)
    context.commit(SET_MANY, res.data)
    return res.data
  },
  async [FETCH_FAVORITE] (context, payload = {}) {
    const builder = this.$myUtils.prepareQueryBuilder(new Tag(), payload) // Prepare query by adding filter and sorting
    const res = await builder.get()
    context.commit(SET_FAVORITE, res.data)
    return res.data
  },
  async [FETCH_ONE] (context, slug) {
    const item = await Tag.$find(slug)
    context.commit(SET_ONE, item)
    return item
  },
  async [SAVE] (context, payload) {
    const model = new Tag(payload)
    return await model.save()
  },
  async [DELETE] (context, payload) {
    const model = new Tag(payload)
    return await model.delete()
  }
}

// Mutations
export const mutations = {
  [SET_MANY] (state, items) {
    state.tags = items
  },
  [SET_ONE] (state, item) {
    state.tag = item
  },
  [SET_META] (state, item) {
    state.meta = item
  },
  [SET_FAVORITE] (state, items) {
    state.favoriteTags = items
  }
}

// Getters
export const getters = {
  tags: (state) => {
    return state.tags
  },
  tag: (state) => {
    return state.tag
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
