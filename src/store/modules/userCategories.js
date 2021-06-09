import apiClient from 'api-client'

export default {
  state: {
    all: [],
    current: {}
  },

  actions: {
    async loadUserCategories ({ commit }, { data }) {
      const userCategories = await apiClient.getUserCategories(data)
      commit('SET_USER_CATEGORIES', { userCategories })
    },
    async deleteCurrentUserGroup ({ commit }, { categorySlug }) {
      await apiClient.deleteUserGroup(categorySlug)
      commit('DELETE_CATEGORY_FROM_USER', { categorySlug })
    }
  },

  mutations: {
    SET_USER_CATEGORIES (state, { userCategories }) {
      state.all = userCategories
    },
    DELETE_CATEGORY_FROM_USER (state, { categorySlug }) {
      state.all = state.all.filter(
        userCategory => userCategory.slug !== categorySlug
      )
    }
  }
}
