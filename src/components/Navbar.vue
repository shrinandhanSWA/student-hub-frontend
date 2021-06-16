<template>
  <nav class="navbar navbar-expand-custom navbar-mainbg">
    <a class="navbar-brand navbar-logo" href="/"> Ease In  </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/"><i class="fas fa-tachometer-alt"></i>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/all-groups"><i class="far fa-address-book"></i>All groups</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/my-groups"><i class="far fa-clone"></i>my groups</a>
        </li>
      </ul>

    </div>

    <div class = "avatar-item">
      <navbar-current-user v-if="isLoggedIn"/>
      <template v-else>
        <button class="nav-button"
                :to="{ name: 'Register' }"
        >
          Sign Up
        </button>
        <button class="nav-button"
                :to="{ name: 'Login' }"
        >
          Log In
        </button>
      </template>
    </div>
  </nav>
</template>

<script>
  import NavbarCurrentUser from './NavbarCurrentUser'

  export default {
    components: { NavbarCurrentUser },
  }
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  body {
    font-family: 'Roboto', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
  }

  i {
    margin-right: 10px;
  }

  /*----------multi-level-accordian-menu------------*/

  .navbar-logo {
    padding: 15px;
    color: #fff;
  }

  .navbar-mainbg {
    position:sticky
    background-color: #5161ce;
    padding: 0px;
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

  .nav-button:hover{
    background-color: darken(#5161ce, 80%);
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
