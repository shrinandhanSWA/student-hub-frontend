import apiClient from 'api-client'
import permissionCheckers from './permissionCheckers'

export default {
  state: {
    currentUser: null,
    current: {}
  },

  actions: {
    async registerUser ({ state }, { data }) {
      const user = await apiClient.registerUser(data)
      return user
    },

    async updateExtraUserInfo({state}, {data}) {
      const { token, user } = await apiClient.updateExtraUserInfo(data)
      localStorage.setItem('auth_token', token)
      commit('SET_USER_DATA', { user })

    },

    async login ({ commit }, { email, password }) {
      const { token, user } = await apiClient.login({ email, password })
      localStorage.setItem('auth_token', token)
      commit('SET_USER_DATA', { user })
    },

    logout ({ commit }) {
      localStorage.removeItem('auth_token')
      commit('SET_USER_DATA', { user: null })
    },

    async loadCurrentUser ({ commit, dispatch }) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          const user = await apiClient.getUserData()
          commit('SET_USER_DATA', { user })
        } catch (e) {
          if (e.data.message === 'out-of-date token') {
            dispatch('logout')
          }
        }
      }
    },

    async updateCurrentUserProfile ({ commit }, { data }) {
      const { token, user } = await apiClient.updateUserProfile({ data })
      localStorage.setItem('auth_token', token)
      commit('SET_USER_DATA', { user })
    },

    async getPublicProfile ({commit}, {username}) {
      const user =  await apiClient.getPublicProfile(username)
      commit('VIEW_CURRENT_PROFILE', {user})
    },

    async updateCurrentUserPassword ({ commit }, { data }) {
      await apiClient.updateUserPassword({ data })
    },

    async updateCurrentUserGroups ({ commit }, { categorySlug }) {
      await apiClient.addUserGroup(categorySlug)
      return categorySlug
    }

  },

  mutations: {
    VIEW_CURRENT_PROFILE(state, {user}) {
      state.current = user
    },

    SET_USER_DATA (state, { user }) {
      state.currentUser = {
        ...user,
        ...permissionCheckers
      }
    },
    DELETE_CATEGORY_FROM_USER (state, { categorySlug }) {
      state.all = state.all.filter(
        category => category.slug !== categorySlug
      )
    }
  },
  getters: {
    isLoggedIn (state) {
      const token = localStorage.getItem('auth_token')
      return (state.currentUser !== null) && (token !== null)
    }
  }
}
