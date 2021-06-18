<template>
  <div class="app-page">
    <div class="header">
      <span class="title">
        Dashboard
      </span>
    </div>
    <dashboard-list/>
  </div>
</template>

<script>
  import DashboardList from '@/components/DashboardList'
  export default {
    components: { DashboardList },
    mounted() {
      if (!isLoggedIn) {
         this.$router.push({ name: 'Login' })
      }
   }

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
