<template>
  <div id="app">
      <navbar v-if="$route.name"/>
      <router-view/>
      <sidebar/>

  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Sidebar from './components/Sidebar'

  export default {
    components: { Navbar, Sidebar }
  }
</script>

<style lang="stylus">
  @import '../node_modules/normalize.css/normalize.css'

  *
    box-sizing: border-box

  body
    background: #F5F5F5
    font-family: 'Lato', sans-serif

  body.no-scroll
    overflow: hidden

  .app-page
    width: 95%
    max-width: 1190px
    margin: 20px 125px 0


  .page-spinner
    display: flex
    justify-content: center
    align-items: center

  .page-form-title
    display: flex
    justify-content: center
    align-items: center
    color: #555
    font-weight: 300
    border-bottom: 1px solid #EEE
    padding: 10px
    margin: 0
    background: #EEE
    font-size: 30px
    border-radius: 3px 3px 0 0

  .page-form-container
    max-width: 960px
    border-radius: 3px
    margin: 0 auto 20px
    display: flex
    flex-direction: column
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2)

  .page-form
    background: #FFF
    padding: 20px 25px
    border-radius: 0 0 3px 3px

</style>
