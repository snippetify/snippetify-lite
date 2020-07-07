import {
  SET_MANY,
  SET_META,
  SET_RESULTS,
  SET_META_RESULTS
} from './mutations.type'
import {
  FETCH_MANY,
  FETCH_RESULTS
} from './actions.type'
import Search from '../models/Search'
import { utils } from '../plugins/vue-utils'

// Initial state
const initialState = {
  items: [],
  meta: {},
  results: [],
  metaResults: {}
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [FETCH_MANY] (context, payload = {}) {
    const builder = utils.prepareQueryBuilder(new Search(), payload) // Prepare query by adding filter and sorting
    const res = await builder.get()
    context.commit(SET_META, res.meta)
    context.commit(SET_MANY, res.data)
    return res.data
  },
  async [FETCH_RESULTS] (context, payload = {}) {
    const builder = utils.prepareQueryBuilder(new Search(), payload) // Prepare query by adding filter and sorting
    const res = await builder.get()
    context.commit(SET_RESULTS, res.data)
    context.commit(SET_META_RESULTS, res.meta)
    return res.data
  }
}

// Mutations
export const mutations = {
  [SET_MANY] (state, items) {
    state.items = items
  },
  [SET_META] (state, item) {
    state.meta = item
  },
  [SET_RESULTS] (state, items) {
    state.results = items
  },
  [SET_META_RESULTS] (state, item) {
    state.metaResults = item
  }
}

// Getters
export const getters = {
  items: (state) => {
    return state.items
  },
  meta: (state) => {
    return state.meta
  },
  results: (state) => {
    return state.results
  },
  metaResults: (state) => {
    return state.metaResults
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
