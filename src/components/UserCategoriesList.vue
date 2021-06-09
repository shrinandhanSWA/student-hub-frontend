<template>
  <div class="user-categories-list">
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
    <user-category-item
      v-else
      v-for="category in userCategories"
      :key="category._id"
      :category="category"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserCategoryItem from './UserCategoryItem'

export default {
  components: { UserCategoryItem },
  data () {
    return {
      loading: true,
      error: false
    }
  },
  computed: {
    ...mapState({
      userCategories: state => state.userCategories.all
    })
  },

  async mounted () {
    try {
      await this.loadUserCategories({ data: {
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
    ...mapActions(['loadUserCategories'])
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
</style>
