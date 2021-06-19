import apiClient from 'api-client'

export default {
  state: {
  },
  actions: {
    async getChat ({ commit }, { data }) {
      const user = await apiClient.getChatData(data)
      return user
    },
    async chatLogin ({ commit }, { data }) {
      const user = await apiClient.chatLogin(data)
      return user
    },
    async getChatUsers ({ commit }) {
      return await apiClient.getChatUsers()
    },
    async getChatMessage ({ commit }, {data }) {
      return await apiClient.getChatMessage(data)
    },

  },

}
