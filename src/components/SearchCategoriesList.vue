<template>
  <div class="app-page search-categories-list">
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
      v-else-if="searchedCategories.length === 0"
      class="error-message"
    >
      Your search did not match any groups. <br> Try to enter different keywords.
    </div>
    <search-category-item
      v-else
      v-for="category in searchedCategories"
      :key="category._id"
      :category="category"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchCategoryItem from './SearchCategoryItem'

export default {
  components: { SearchCategoryItem },
  data () {
    return {
      loading: true,
      error: false
    }
  },
  computed: {
    ...mapState({
      searchedCategories: state => state.userCategories.search
    })
  },
  methods: {
  ...mapActions(['loadSearchCategories'])
},
  watch: {
    '$route.params.query': {
      immediate: true,
      async handler (query) {
        this.loading = true
        try {
          await this.loadSearchCategories({ data: {query} })
          this.loading = false
        } catch (err) {
          this.$router.push({ name: 'Home' })
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.category-item
  margin-bottom: 20px

.categories-list-title
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
