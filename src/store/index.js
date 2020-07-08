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
  SET_PAGE,
  SET_VS_CODE
} from './mutations.type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 'index',
    vscode: {}
  },
  mutations: {
    [SET_PAGE] (state, item) {
      state.page = item
    },
    [SET_VS_CODE] (state, item) {
      state.vscode = item
    }
  },
  actions: {
  },
  getters: {
    page: (state) => state.page,
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
