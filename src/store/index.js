import Vue from 'vue'
import Vuex from 'vuex'
import Tag from './tag'
import Vote from './vote'
import Auth from './auth'
import User from './user'
import Search from './search'
import Snippet from './snippet'
import Favorite from './favorite'
import {
  SET_VS_CODE
} from './mutations.type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vscode: {}
  },
  mutations: {
    [SET_VS_CODE] (state, item) {
      state.vscode = item
    },
  },
  actions: {
  },
  getters: {
    vscode: (state) => state.vscode
  },
  modules: {
    tag: Tag,
    vote: Vote,
    auth: Auth,
    user: User,
    search: Search,
    snippet: Snippet,
    favorite: Favorite
  }
})
