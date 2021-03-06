import axios from 'axios'

const request = async (method, url, requestData) => {
  try {
    const { data } = await axios({
      baseURL: process.env.VUE_APP_API_SERVER_BASE_URL,
      method,
      url,
      data: requestData,
      headers: {
        Authorization: 'Bearer ' + (localStorage.getItem('auth_token'))
      }
    })
    return Promise.resolve(data)
  } catch (err) {
    const error = {
      status: err.response.status,
      data: err.response.data
    }
    return Promise.reject(error)
  }
}

export default {

  pusherAuthentication(){
    return request('post', 'pusher/auth')
  },

  getChatUsers(){
    return request('get', 'getChatUsers')
  },

  getCategories () {
    return request('get', 'categories')
  },
  getUserCategories (data) {
    return request('put', 'user-categories', data)
  },

  getSuggestedCategories (data) {
    return request('put', 'suggested-categories', data)
  },

  getSearchCategories (data) {
    return request('put', 'search-categories', data)
  },

  getDashboardCategories (data){
    return request('put', 'dashboard-categories', data)
  },

  getCategory (categorySlug) {
    return request('get', `categories/${categorySlug}`)
  },

  createCategory (data) {
    return request('post', 'categories', data)
  },

  updateCategory (categorySlug, data) {
    return request('put', `categories/${categorySlug}`, data)
  },

  updateUserCategoryPostsSeen (categorySlug, data) {
    return request('put', `categories-posts/${categorySlug}`, data)
  },

  checkNewPosts (categorySlug, data) {
    return request('put', `categories-newposts/${categorySlug}`, data)
  },

  deleteCategory (categorySlug) {
    return request('delete', `categories/${categorySlug}`)
  },

  getTopics (filters, data) {
    if (filters.categorySlug) {
      return request('put', `categories/${filters.categorySlug}/topics`, data)
    }
  },

  getTopic (topicId, data) {
    return request('put', `topico/${topicId}`, data)
  },

  downvoteTopic (topicId, data) {
    return request('put', `topic-downvote/${topicId}`, data)
  },

  createTopic (data) {
    return request('post', 'topics', data)
  },

  updateTopic (topicId, data) {
    return request('put', `topics/${topicId}`, data)
  },
  upvoteTopic (topicId, data) {
    return request('put', `topic-upvote/${topicId}`, data)
  },

  checkUpvoted (topicId, data) {
    return request('put', `topic-check/${topicId}`, data)
  },

  checkDownvoted (topicId, data) {
    return request('put', `topic-check-down/${topicId}`, data)
  },

  deleteTopic (topicId) {
    return request('delete', `topics/${topicId}`)
  },

  checkUnseen (topicId, data) {
    return request('put', `topics-check/${topicId}`, data)
  },

  addReply (topicId, data) {
    return request('post', `topics/${topicId}/replies`, data)
  },

  deleteReply (topicId, replyId) {
    return request('delete', `topics/${topicId}/replies/${replyId}`)
  },

  updateReply (topicId, replyId, data) {
    return request('put', `topics/${topicId}/replies/${replyId}`, data)
  },

  upvoteReply (topicId, replyId, data) {
    return request('get', `/topics/${topicId}/upvote-reply/${replyId}`, data)
  },
  downvoteReply (topicId, replyId, data) {
    return request('get', `/topics/${topicId}/downvote-reply/${replyId}`, data)
  },

  registerUser (data) {
    return request('post', 'register', data)
  },

  updateExtraUserInfo(data) {
    return request('put', 'extraUserInfo', data )
  },

  login ({ email, password }) {
    return request('post', 'login', { email, password })
  },

  getUserData () {
    return request('get', 'getprofile')
  },

  getPublicProfile(username) {
    return request('put', `user/${username}`, username)
  },

  updateUserProfile ({ data }) {
    return request('put', 'profile', data)
  },

  updateUserPassword ({ data }) {
    return request('put', 'profile/password', data)
  },

  addUserGroup (categorySlug) {
    return request('put', `groups/${categorySlug}`, {})
  },

  deleteUserGroup (categorySlug) {
    return request('delete', `groups-remove/${categorySlug}`)
  },

  getChatData(data) {
    return request('put', 'getChatData', data)
  },

  chatLogin(data){
    return request('post', 'chatLogin', data)
  },

  getChatMessage(data){
    return request('post', 'getChatMessage', data)
  },

  requestChat(data){
    return request('post', 'requestChat', data)
  },

  sendMessage(data){
    return request('post', 'sendMessage', data)
  }


}
