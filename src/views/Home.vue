<template>
  <div class="app-page">
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
    components: { UserCategoriesList },
  }
</script>

<style lang="stylus" scoped>

  .title{
    margin-left: 125px
  }

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
