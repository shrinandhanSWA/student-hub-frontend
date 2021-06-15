<template>
  <div class="app-page home-page">
    <div class="header">
      <span class="title">
        Suggested Groups
      </span>
    </div>
    <user-suggested-categories-list/>
  </div>
</template>

<script>
import UserSuggestedCategoriesList from '@/components/UserSuggestedCategoriesList'
export default {
  components: { UserSuggestedCategoriesList }
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

  .new-topic-button
    font-size: 14px
</style>
