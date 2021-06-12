<template>
  <div class="topic-view">
    <base-confirm-dialog
      v-if="showConfirmDialog"
      confirm-button-title="delete"
      dismiss-button-title="cancel"
      @dismiss="showConfirmDialog = false"
      @confirm="$emit('delete')"
    >
      <template #title>
        Delete this topic?
      </template>
      <template #default>
        You cannot undo this action.
      </template>
    </base-confirm-dialog>

    <h1 class="title">
      {{ topic.title }}
    </h1>
    <div class="author">
      <base-avatar
        class="author-left"
        :src="topic.user.avatarUrl"
        :name="topic.user.name"></base-avatar>
      <div class="author-right">
        <router-link class="view-profile"
                     :to="{ name: 'ViewProfile', params: { username: topic.user.username } }">
          <div class="author-right-name">
              <span class="author-name">
          {{ topic.user.name }}
        </span>
            <i class="profile"
               :class="{student_color: (topic.user.profileType === 'student')}">
              {{ topic.user.profileType }}
            </i>
          </div>
        </router-link>
        <span class="date">
          {{ topic.createdAt | humanizeDate }}
        </span>
      </div>
    </div>
    <p class="topic-content">
      {{ topic.content }}
    </p>
    <div class="topic-footer">
      <div class="topic-footer-reply">
        <i v-if="isLoggedIn" class="fa fa-angle-up fa-2x" @click="upvote"
           :class="{upvoted_color: upvoted}"></i>
        <span class="votes">{{ votes }}</span>
        <i v-if="isLoggedIn" class="fa fa-angle-down fa-2x" @click="downvote"
           :class="{downvoted_color: downvoted}"></i>
      </div>
      <div class="topic-footer-reply">
        <h2 class="topic-footer-reply-title">
          {{ topic.replies && topic.replies.length ? topic.replies.length : 'No' }} Replies
        </h2>
        <base-button
          class="reply-button"
          @click="onReply"
        >
          <i class="fas fa-reply reply-icon"></i>
          Reply
        </base-button>
      </div>
      <div class="action-buttons">
        <router-link
          v-if="isLoggedIn && currentUser && currentUser.canEditTopic(topic)"
          :to="{ name: 'EditTopic', params: { topicId: topic._id } }"
        >
          <i class="action-button fas fa-pencil-alt"></i>
        </router-link>
        <i
          v-if="isLoggedIn && currentUser && currentUser.canDeleteTopic(topic)"
          class="action-button fas fa-trash-alt"
          @click="showConfirmDialog = true"
        ></i>
      </div>
    </div>
    <div class="replies-section">
      <div class="replies-content">
        <reply
          v-for="reply in topic.replies"
          :key="reply._id"
          :reply="reply"
          :category-slug="topic.category.slug"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Reply from './Reply'
  import { email, required } from 'vuelidate/lib/validators'

  export default {
    components: { Reply },
    props: {
      topic: {
        type: Object,
        default: () => ({})
      }
    },

    validations: {
      email: { required, email },
      name: { required }
    },
    data () {
      // var self = this

      return {
        showConfirmDialog: false,
        upvoted: false,
        downvoted: false
      }
    },
    async mounted () {
      try {
        this.upvoted = await this.checkUpvoted({
          topicId: this.topic._id,
          data: {
            email: this.currentUser.email
          }
        })

        this.downvoted = await this.checkDownvoted({
          topicId: this.topic._id,
          data: {
            email: this.currentUser.email
          }
        })
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    computed: {
      votes: function () {
        return this.topic.upvotes
      }
    },
    methods: {
      ...mapActions(
        ['setNextRoute', 'upvoteTopic', 'downvoteTopic', 'checkUpvoted', 'checkDownvoted']),
      onReply () {
        if (this.isLoggedIn) {
          this.$emit('reply')
        } else {
          this.setNextRoute({ route: this.$route.fullPath })
          this.$router.push({ name: 'Login' })
        }
      },

      upvote: function () {
        if (!this.upvoted) {
          this.upvoteTopic({
            topicId: this.topic._id,
            data: {
              email: this.currentUser.email,
              realUpvote: true
            }
          })
        } else {
          this.downvoteTopic({
            topicId: this.topic._id,
            data: {
              email: this.currentUser.email,
              realDownvote: false
            }
          })
        }
        if (this.downvoted) {
          this.upvoteTopic({
            topicId: this.topic._id,
            data: {
              email: this.currentUser.email,
              realUpvote: true
            }
          })
        }
        this.upvoted = !this.upvoted
        this.downvoted = false
      },

      downvote: function () {
        if (!this.downvoted) {
          this.downvoteTopic({
            topicId: this.topic._id,
            data: {
              email: this.currentUser.email,
              realDownvote: true
            }
          })
        } else {
          this.upvoteTopic({
            topicId: this.topic._id,
            data: {
              email: this.currentUser.email,
              realUpvote: false
            }
          })
        }

        if (this.upvoted) {
          this.downvoteTopic({
            topicId: this.topic._id,
            data: {
              email: this.currentUser.email,
              realDownvote: true
            }
          })
        }

        this.downvoted = !this.downvoted
        this.upvoted = false
      }
    }
  }

</script>

<style lang="stylus" scoped>
  .topic-view
    background: #FFF
    border-radius: 3px
    padding: 10px 25px

  .title
    font-size: 25px
    font-weight: 400
    color: #222
    margin-bottom: 30px

  .author
    display: flex
    align-items: center

  .author-right
    margin-left: 15px
    display: flex
    flex-direction: column

  .author-right-name
    margin-left: 0px
    display: flex
    flex-direction: row

  .author-name
    color: #444

  .profileType
    background-color: #3785ff
    margin: 3px

  .view-profile {
    color: #444
    text-decoration : none
  }

  .profile
    background-color: #3e8e41
    margin-left: 10px
    font-style: normal
    color: white
    border-radius: 4px
    padding-top: 1px
    padding-left: 3px
    padding-right: 3px
    padding-bottom: 1px

  .date
    color: #999
    font-size: 13px
    margin-top: 3px

  .topic-content
    line-height: 1.7
    color: #333
    margin-top: 20px

  .topic-footer
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 40px
    padding-bottom: 20px

  .topic-footer-reply
    display: flex
    align-items: center

  .topic-footer-reply-title
    font-size: 16px
    color: #333
    font-weight: 500
    margin: 0

  .reply-button
    margin-left: 20px
    font-size: 14px

  .action-button
    margin-left: 15px
    color: $primaryColor
    cursor: pointer

  .reply-icon
    margin-right: 3px

  .reply
    border-top: 1px solid #F0F0F0
    padding: 30px 0


  .votes {
    display: inline-block;
    text-align: center;
    width: 1.8em;
    font-size: 25px
  }

  .upvoted_color {
    color: #FF8B60;
  }

  .downvoted_color {
    color: #9494FF;
  }

</style>
