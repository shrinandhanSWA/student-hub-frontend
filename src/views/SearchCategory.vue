<template>
  <div class="app-page home-page">
    <div class="header">
      <span class="title">
        Results
      </span>
      <div class="search">
        <base-input class="search-query"
                    v-model="query"
                    placeholder="search...">
        </base-input>
        <router-link :to="{ name: 'SearchCategory', params: { query: this.query }}">
          <i class="search-icon fas fa-search fa-lg"></i>
        </router-link>
      </div>
      </div>
    <search-categories-list/>
  </div>
</template>

<script>
import SearchCategoriesList from '@/components/SearchCategoriesList'
export default {
  components: { SearchCategoriesList },

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
  margin-left: 125px

.search
  display :flex
  align-items : center

.search-icon
  color: $buttonColor

.search-query
  width: 370px

.new-topic-button
  font-size: 14px
</style>
