import apiClient from 'api-client'

export default {
  state: {
  },
  actions: {
    async getChat ({ commit }, { data }) {
      return await apiClient.getChatData(data)
    },
    async chatLogin ({ commit }, { data }) {
      return await apiClient.chatLogin(data)
    },
    async getChatUsers ({ commit }) {
      return await apiClient.getChatUsers()
    },
    async getChatMessage ({ commit }, {data }) {
      return await apiClient.getChatMessage(data)
    },

    async requestChat ({ commit }, {data }) {
      return await apiClient.requestChat(data)
    },

    async sendMessage ({ commit }, {data }) {
      return await apiClient.sendMessage(data)
    },

  },
}
