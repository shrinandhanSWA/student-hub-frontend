<template>
  <div class="header-design">
    <nav class="navbar navbar-expand-custom navbar-mainbg">
      <a class="navbar-brand navbar-logo" href="/">
        <img
          class="navbar-logo"
          src="https://firebasestorage.googleapis.com/v0/b/drp-project-database.appspot.com/o/output-onlinepngtools%20(1).png?alt=media&token=dacac529-6b8a-43a7-99f6-14ab0cd844d5"
          alt="In the Loop"
          width="140"
          height="50"
        >

      </a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }">
              <i class="icon fas fa-home"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'HowToUse' }">
              <i class="icon fas fa-question"></i>
              How To Use
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'ViewProfile', params: { username: currentUser.username }} ">
              <i class="icon fas fa-user-circle"></i>
              Profile
            </router-link>
          </li>

        </ul>

      </div>

      <div class="avatar-item">
        <navbar-current-user v-if="isLoggedIn"/>
        <template v-else>
          <router-link class="nav-button"
                  :to="{ name: 'Register' }"
          >
            Sign Up
          </router-link>
          <router-link class="nav-button"
                  :to="{ name: 'Login' }"
          >
            Log In
          </router-link>
        </template>
      </div>
    </nav>
  </div>

</template>

<script>
  import NavbarCurrentUser from './NavbarCurrentUser'

  export default {
    components: { NavbarCurrentUser },
  }
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:300');


  body {
    font-family: 'Titillium Web', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .icon {
    margin-right: 3px
  }


  /*----------multi-level-accordian-menu------------*/

  .navbar-logo {
    margin-left: 4px
    padding: 1px;
    color: #fff;
  }

  .nav-link {
    font-family: 'Titillium Web', sans-serif;
  }

  .navbar-mainbg {
    background-color: #5161ce;
    padding: 0px;
  }

  .header-design {
    position: sticky
    top: 0
  }

  .nav-item {
    margin-right: 30px
  }

  .avatar-item {
    margin-right: 20px
  }

  .nav-button {
    margin-right: 10px
    background-color: darken(#5161ce, 50%);
    border: 3px
    color: white
    padding: 10px 15px
    border-radius: 6px
    outline: none
    cursor: pointer
    transition: 0.2s background ease-out
    text-decoration: none
    display: inline-block
    text-align: center
  }

  .nav-button:hover {
    background-color: darken(#5161ce, 80%);
    color: white
  }


  #navbarSupportedContent ul {
    padding: 0px;
    margin: 0px;
  }


  #navbarSupportedContent li {
    list-style-type: none;
  }

  #navbarSupportedContent li:hover {
    background-color: darken(#5161ce, 30%);
  }

  #navbarSupportedContent ul li a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: 20px;
    display: block;
    padding: 20px 20px;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: relative;
  }


  @media (min-width: 992px) {
    .navbar-expand-custom {
      -ms-flex-flow: row nowrap;
      flex-flow: row nowrap;
      -ms-flex-pack: start;
      justify-content: flex-start;
    }

    .navbar-expand-custom .navbar-nav {
      -ms-flex-direction: row;
      flex-direction: row;
    }

    .navbar-expand-custom .navbar-toggler {
      display: none;
    }

    .navbar-expand-custom .navbar-collapse {
      display: -ms-flexbox !important;
      display: flex !important;
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
    }
  }


  @media (max-width: 991px) {
    #navbarSupportedContent ul li a {
      padding: 12px 30px;
    }

    .hori-selector {
      margin-top: 0px;
      margin-left: 10px;
      border-radius: 0;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }

    .hori-selector .left,
    .hori-selector .right {
      right: 10px;
    }

    .hori-selector .left {
      top: -25px;
      left: auto;
    }

    .hori-selector .right {
      bottom: -25px;
    }

    .hori-selector .left:before {
      left: -25px;
      top: -25px;
    }

    .hori-selector .right:before {
      bottom: -25px;
      left: -25px;
    }
  }

</style>
