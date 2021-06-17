<template>
  <div class="app-page user-categories-list">
    <base-spinner
      v-if="loading"
      class="page-spinner"
    />
    <div v-else-if="!isLoggedIn"
         class="error-message">
      Login or Sign up to view this page
    </div>
    <div
      v-else-if="error && isLoggedIn"
      class="error-message"
    >
      An error occured while fetching the categories.<br>Try to reload the page.
    </div>

    <div
      v-if="DashboardCategories.length === 0 && isLoggedIn"
      class="message"
    >
      You have not joined any groups. Click
      <router-link
        v-if="isLoggedIn"
        :to="{ name: 'SuggestedGroups'}"
      > here</router-link>

      to browse suggested groups, or click
      <router-link
        v-if="isLoggedIn"
        :to="{ name: 'allGroups'}"
      > here</router-link>
      to browse all groups.

    </div>

    <user-category-item
      v-else
      v-for="category in DashboardCategories"
      :key="category._id"
      :category="category"
    />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
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
        DashboardCategories: state => state.userCategories.dashboard
      })
    },

    async mounted () {
      try {
        await this.loadDashboardCategories({
          data: {
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
      ...mapActions(['loadDashboardCategories'])
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
