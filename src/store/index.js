import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'
import topics from './modules/topics'
import users from './modules/users'
import userCategories from './modules/userCategories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories,
    userCategories,
    topics,
    users
  },

  state: {
    nextRoute: null
  },

  actions: {
    setNextRoute ({ commit }, { route }) {
      commit('SET_NEXT_ROUTE', { route })
    }
  },

  mutations: {
    SET_NEXT_ROUTE (state, { route }) {
      state.nextRoute = route
    }
  }
})
