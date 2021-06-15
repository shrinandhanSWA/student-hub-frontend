import apiClient from 'api-client'

export default {
  state: {
  },
  actions: {
    async createChatId ({ commit }, { data }) {
      const user = await apiClient.getChatId(data)
      console.log(user)
      return user
    }
  },

}
