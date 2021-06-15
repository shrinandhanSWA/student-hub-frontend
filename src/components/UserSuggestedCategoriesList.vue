<template>
  <div class="user-suggested-categories-list">
    <base-spinner
      v-if="loading"
      class="page-spinner"
    />
    <div
      v-else-if="error"
      class="error-message"
    >
      An error occured while fetching the categories.<br>Try to reload the page.
    </div>

    <div
      v-if="suggestedCategories.length === 0"
      class="message"
    >
      You have not joined any groups. Click <a href="/all-groups">here</a> to browse all groups
    </div>

    <user-suggested-category-item
      v-else
      v-for="category in suggestedCategories"
      :key="category._id"
      :category="category"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserSuggestedCategoryItem from './UserSuggestedCategoryItem'

export default {
  components: { UserSuggestedCategoryItem },
  data () {
    return {
      loading: true,
      error: false
    }
  },
  computed: {
    ...mapState({
      suggestedCategories: state => state.userCategories.suggested
    })
  },

  async mounted () {
    try {
      await this.loadSuggestedUserCategories({ data: {
        email: this.currentUser.email
      }
      })
      this.loading = false
    } catch (err) {
      this.loading = false
      this.error = true
    }
  },

  methods: {
    ...mapActions(['loadSuggestedUserCategories'])
  }
}
</script>

<style lang="stylus" scoped>
.category-item
  margin-bottom: 20px

.user-categories-list-title
  font-size: 18px
  color: #777
  font-weight 400

.error-message
  text-align: center
  font-size: 20px
  color: #888
  font-weight: 500
  line-height: 1.5
  margin-top: 50px

.message
  text-align: center
  font-size: 20px
  color: #888
  font-weight: 500
  line-height: 1.5
  margin-top: 50px
</style>
