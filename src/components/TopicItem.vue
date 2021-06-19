<template>
  <router-link
    class="topic-item"
    :to="{ name: 'Topic', params: { topicId: topic._id } }"
  >
    <base-avatar
      :name="topic.user.name"
      :src="topic.user.avatarLocation"></base-avatar>
    <div class="main">
      <h1 class="title">
        {{ topic.title }}
      </h1>
      <p class="meta">
        by
        <span class="user-name">
          {{ topic.user.name }}
        </span>
        <span class="date">
          {{ topic.createdAt | humanizeDate }}
        </span>
      </p>
    </div>
    <div class="numbers">
      <div class="circle"
      v-if="unseen"></div>
       <span class="upvotes">
        {{ topic.upvotes }}
        <i class="fas fa-chevron-up"></i>
      </span>
      <span class="views">
        {{ topic.views }}
        <i class="fas fa-eye icon"></i>
      </span>
      <span class="replies">
        {{ topic.numberOfReplies }}
        <i class="fas fa-comment icon"></i>
      </span>

    </div>
  </router-link>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  props: {
    topic: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      unseen: false
    }
  },
  methods: {
    ...mapActions(['checkUnseen'])
  },
  async mounted () {
      try {
        this.unseen = !(await this.checkUnseen({
          topicId: this.topic._id,
          data: {
            email: this.currentUser.email
          }
        }))
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
}
</script>

<style lang="stylus" scoped>
.topic-item
  background: white
  padding: 15px
  cursor: pointer
  transition: 0.2s background ease-out
  display block
  text-decoration none
  display: flex
  align-items: center
  border-radius:10px

.topic-item:hover
  background: #F9F9F9

.main
  margin-left: 20px
  display: flex
  flex-direction: column
  justify-content: center

.numbers
  flex: 1
  display: flex
  justify-content: flex-end
  align-items: center
  padding-right: 10px
  color: #999
  font-size: 14px

.views
  margin-left: 4px
  margin-right: 10px

.upvotes
  margin-right: 4px

.icon
  margin-left: 2px

.circle {
  width: 10px
  height: 10px
  line-height: 30px
  border-radius: 50%
  background: #00cc00
  margin-right: 10px
}

.meta
  margin: 3px 0 0
  font-size: 14px
  color: #999

.user-name
  color: #666

.title
  font-size: 20px
  margin: 0
  font-weight 400
  color: #000

.description
  color: #999
  margin: 10px 0 0
</style>
