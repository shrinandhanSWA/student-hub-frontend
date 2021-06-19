import apiClient from 'api-client'

export default {
  state: {
  },
  actions: {
    async getChat ({ commit }, { data }) {
      const user = await apiClient.getChatData(data)
      return user
    }
  },

}
