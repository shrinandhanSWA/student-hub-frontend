import apiClient from 'api-client'

export default {
  state: {
    all: [],
    suggested: [],
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
    },
    async loadSuggestedUserCategories ({ commit }, { data }) {
      const suggestedCategories = await apiClient.getSuggestedCategories(data)
      commit('SET_SUGGESTED_CATEGORIES', { suggestedCategories })
    },
    async joinSuggestedCategory ({ commit }, { categorySlug }) {
      await apiClient.addUserGroup(categorySlug)
      commit('REMOVE_SUGGESTED_GROUP', { categorySlug })
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
    },
    SET_SUGGESTED_CATEGORIES (state, { suggestedCategories }) {
      state.suggested = suggestedCategories
    },
    REMOVE_SUGGESTED_GROUP (state, { categorySlug }) {
      state.suggested = state.suggested.filter(
        userCategory => userCategory.slug !== categorySlug
      )
    },
  }
}
