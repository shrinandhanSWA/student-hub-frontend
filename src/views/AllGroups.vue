<template>
  <div class="app-page home-page">
    <div class="header">
      <span class="title">
        All Groups
      </span>
      <div class="search">
        <base-input class="search-query"
                    v-model="query"
                    placeholder="search..."></base-input>
        <router-link
          :to="{ name: 'SearchCategory', params: { query: this.query }}"
        >
          <i class="search-icon fas fa-search fa-lg"></i>
        </router-link>
      </div>

      <base-button
        v-if="isLoggedIn && currentUser.can('categories:write')"
        class="new-category-button"
        :to="{ name: 'CreateCategory' }"
      >
        <i class="fas fa-plus plus-icon"></i>
        New Group
      </base-button>


    </div>
    <categories-list/>
  </div>
</template>

<script>
import CategoriesList from '@/components/CategoriesList'
export default {
  components: { CategoriesList },

  data () {
      return {
        query: ''
      }
    }
}
</script>

<style lang="stylus" scoped>
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 10px

.plus-icon
  margin-right: 5px

.title
  color: #666

.search
  display :flex
  align-items : center

.search-icon
  color: $buttonColor
  margin-left: 10px

.search-query
  margin-left: 350px

.new-topic-button
  font-size: 14px
</style>
