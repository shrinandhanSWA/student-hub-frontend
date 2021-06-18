<template>
  <div class="app-page home-page">
    <div class="header">
      <span class="title">
        My Groups
      </span>
    </div>
    <user-categories-list/>
  </div>
</template>

<script>
import UserCategoriesList from '@/components/UserCategoriesList'
export default {
  components: { UserCategoriesList }
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

  .new-topic-button
    font-size: 14px
</style>
