<template>

  <div style="height: 100%; overflow: hidden">
    <nav class="main-menu">
      <ul>
        <li>
          <router-link class="nav-text" :to="{ name: 'Home' }">
            <i class="nav-icon fa fa-home fa-3x"></i>
            <span class="nav-text">Home</span>
          </router-link>
        </li>

        <li>
          <router-link class="nav-text" :to="{ name: 'MyGroups' }">
            <i class="nav-icon fa fa-users fa-3x"></i>
            <span class="nav-text">My groups</span>
          </router-link>
        </li>

        <li>
          <router-link class="nav-text" :to="{ name: 'allGroups' }">
            <i class="nav-icon fa fa-database fa-3x"></i>
            <span class="nav-text">All groups</span>
          </router-link>
        </li>

        <li>
          <router-link class="nav-text" :to="{ name: 'SuggestedGroups' }">
            <i class="nav-icon fa fa-swatchbook fa-3x"></i>
            <span class="nav-text">Groups for you</span>
          </router-link>
        </li>

        <li>
          <router-link class="nav-text" :to="{ name: 'SearchCategory', params : { query: ' ' } }">
            <i class="nav-icon fa fa-search fa-3x"></i>
            <span class="nav-text">Search groups</span>
          </router-link>
        </li>
      </ul>

      <ul class="logout">
         <li>
            <router-link class="nav-text" :to="{ name: 'HowToUse' }">
              <i class="nav-icon fas fa-question"></i>
                <span class="nav-text">How to use </span>
            </router-link>
          </li>
        <li>
          <router-link class="nav-text" :to="{ name: 'ContactUs'}">
            <i class="nav-icon fa fa-phone fa-3x"></i>
            <span class="nav-text">Contact us </span>
          </router-link>
        </li>
        <li>
          <router-link class="nav-text" :to="{ name: 'AccountSettings'}">
            <i class="nav-icon fa fa-cog fa-3x"></i>
            <span class="nav-text">Settings </span>
          </router-link>
        </li>

      </ul>
    </nav>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {

    methods: {
      ...mapActions(['logout']),
      logoutUser () {
        this.logout()
        this.$router.push({ name: 'allGroups' })
      }
    }
  }
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:300');

  .fa-2x {
    font-size: 2em;
  }

  .fa {
    position: relative;
    display: table-cell;
    width: 60px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
  }


  .main-menu:hover, nav.main-menu.expanded {
    width: 243px;
    overflow: visible;
  }

  .main-menu {
    background: darken(#5161ce, 80%);
    border-right: 1px solid #e5e5e5;
    position: fixed;
    top: 69px;
    height: 653px
    left: 0;
    width: 60px;
    overflow: hidden;
    -webkit-transition: width .05s linear;
    transition: width .05s linear;
    -webkit-transform: translateZ(0) scale(1, 1);
    z-index: 1000;
  }

  .main-menu > ul {
    margin: 7px 0;
  }

  .main-menu li {
    position: relative;
    display: block;
    margin-bottom: 20px;
    width: 243px;
  }

  .main-menu li > a {
    position: relative;
    display: table;
    border-collapse: collapse;
    border-spacing: 0;
    color: #999;
    font-family: arial;
    font-size: 18px;
    text-decoration: none;
    -webkit-transform: translateZ(0) scale(1, 1);
    -webkit-transition: all .1s linear;
    transition: all .1s linear;

  }

  .sidebar-item {
    margin-top: 30px
  }


  .main-menu .nav-icon {
    position: relative;
    display: table-cell;
    width: 100px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size: 18px;
  }

  .main-menu .nav-text {
    text-decoration : none
    position: relative;
    display: table-cell;
    vertical-align: middle;
    width: 250px;
    font-family: 'Titillium Web', sans-serif;
  }

  .main-menu > ul.logout {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .no-touch .scrollable.hover {
    overflow-y: hidden;
  }

  .no-touch .scrollable.hover:hover {
    overflow-y: auto;
    overflow: visible;
  }

  a:hover, a:focus {
    text-decoration: none;
  }

  nav {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  nav ul, nav li {
    outline: 0;
    margin: 0;
    padding: 0;
  }

  .main-menu li:hover > a, nav.main-menu li.active > a, .dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus, .dropdown-menu > .active > a, .dropdown-menu > .active > a:hover, .dropdown-menu > .active > a:focus, .no-touch .dashboard-page nav.dashboard-menu ul li:hover a, .dashboard-page nav.dashboard-menu ul li.active a {
    color: #fff;
    background-color: #5fa2db;
  }

  .area {
    float: left;
    background: #e2e2e2;
    width: 100%;
    height: 100%;
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 300;
    src: local('Titillium WebLight'), local('TitilliumWeb-Light'), url('http://themes.googleusercontent.com/static/fonts/titilliumweb/v2/anMUvcNT0H1YN4FII8wpr24bNCNEoFTpS2BTjF6FB5E.woff') format('woff');
  }


</style>
