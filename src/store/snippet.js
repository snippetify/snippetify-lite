import {
  SET_ONE,
  SET_MANY,
  SET_META,
  SET_TYPES,
  INCREMENT_VOTE_UP,
  DECREMENT_VOTE_UP,
  INCREMENT_FAVORITE,
  DECREMENT_FAVORITE,
  INCREMENT_VOTE_DOWN,
  DECREMENT_VOTE_DOWN
} from './mutations.type'

import {
  SAVE,
  DELETE,
  FETCH_ONE,
  FETCH_MANY,
  FETCH_TYPES
} from './actions.type'

import Snippet from '../models/Snippet'

// Initial state
const initialState = {
  snippet: {},
  snippets: [],
  types: [],
  meta: {}
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [FETCH_MANY] (context, payload = {}) {
    const builder = this.$myUtils.prepareQueryBuilder(new Snippet(), payload) // Prepare query by adding filter and sorting
    const res = await builder.get()
    context.commit(SET_META, res.meta)
    context.commit(SET_MANY, res.data)
    return res.data
  },
  async [FETCH_TYPES] (context) {
    const res = await Snippet.custom('snippets/types').$get()
    context.commit(SET_TYPES, res)
    return res
  },
  async [FETCH_ONE] (context, slug) {
    const item = await Snippet.$find(slug)
    context.commit(SET_ONE, item)
    return item
  },
  async [SAVE] (context, payload) {
    const model = new Snippet(payload)
    return await model.save()
  },
  async [DELETE] (context, payload) {
    const model = new Snippet(payload)
    return await model.delete()
  }
}

// Mutations
export const mutations = {
  [SET_MANY] (state, items) {
    state.snippets = items
  },
  [SET_ONE] (state, item) {
    state.snippet = item
  },
  [SET_TYPES] (state, items) {
    state.types = items
  },
  [SET_META] (state, item) {
    state.meta = item
  },
  [INCREMENT_FAVORITE] (state, { id }) {
    state.snippet.favorites_count++
    state.snippet.user_favorited = true
    state.snippet.user_favorite_id = id
  },
  [DECREMENT_FAVORITE] (state) {
    state.snippet.favorites_count--
    state.snippet.user_favorited = false
    state.snippet.user_favorite_id = 0
  },
  [INCREMENT_VOTE_UP] (state) {
    state.snippet.user_voted = true
    state.snippet.user_voted_up = true
    state.snippet.votes_up_count++
  },
  [DECREMENT_VOTE_UP] (state) {
    state.snippet.user_voted = false
    state.snippet.user_voted_up = false
    state.snippet.votes_up_count--
  },
  [INCREMENT_VOTE_DOWN] (state) {
    state.snippet.user_voted = true
    state.snippet.user_voted_down = true
    state.snippet.votes_down_count++
  },
  [DECREMENT_VOTE_DOWN] (state) {
    state.snippet.user_voted = false
    state.snippet.user_voted_down = false
    state.snippet.votes_down_count--
  }
}

// Getters
export const getters = {
  snippet: (state) => {
    return state.snippet
  },
  snippets: (state) => {
    return state.snippets
  },
  types: (state) => {
    return state.types
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
