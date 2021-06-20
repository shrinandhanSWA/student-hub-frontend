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
      const users =  await apiClient.getChatUsers()
      return users
    },
    async getChatMessage ({ commit }, {data }) {
      return await apiClient.getChatMessage(data)
    },

    async requestChat ({ commit }, {data }) {
      const res = await apiClient.requestChat(data)
      return res
    },

    async sendMessage ({ commit }, {data }) {
      const res = await apiClient.sendMessage(data)
      return res
    },

  },

}
