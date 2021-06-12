<template>
  <div class="container emp-profile">
    <form method="post">
      <div class="row">
        <div class="col-md-4">
          <div class="profile-img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
              alt=""/>
            <div class="file btn btn-lg btn-primary">
              Change Photo
              <input type="file" name="file"/>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile-head">
            <h5>
              {{ users.name}}
            </h5>
            <h6>
              {{users.profileType === 'student' ? users.school : users.uni}} student
            </h6>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" role="tab"
                   aria-controls="home" aria-selected="true">About</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2">
          <router-link
            v-if="users.name === currentUser.name"
            :to="{ name: 'AccountSettings' }">
            <i class="profile-edit-btn"> Edit profile </i>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="profile-work">
            <p>FOLLOW ME ON</p>
            <a> <i class="logo-view fab fa-instagram"></i> {{currentUser.instaName}} </a><br/>
            <a> <i class="logo-view fab fa-snapchat"></i> {{currentUser.snapName}} </a><br/>
            <p>CONTACT INFO</p>
            <a>{{users.email}}</a><br/>
          </div>
        </div>
        <div class="col-md-8">
          <div class="tab-content profile-tab" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel"
                 aria-labelledby="home-tab">
              <div class="row">
                <div class="col-md-6">
                  <label>School Attended </label>
                </div>
                <div class="col-md-6">
                  <p>{{users.school}}</p>
                </div>
              </div>
              <div v-if="users.uni === 'alumni'" class="row">
                <div class="col-md-6">
                  <label> Current University </label>
                </div>
                <div class="col-md-6">
                  <p> {{users.uni}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Interests</label>
                </div>
                <div class="col-md-6">
                  <p>{{users.interests === '' ? 'N/A' : users.interests}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Hobbies</label>
                </div>
                <div class="col-md-6">
                  <p>{{users.hobbies === '' ? 'N/A': users.hobbies}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Looking for</label>
                </div>
                <div class="col-md-6">
                  <p> {{users.lookingFor === '' ? 'N/A': users.lookingFor}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Bio</label>
                </div>
                <div class="col-md-6">
                  <p> {{users.bio === '' ? 'N/A': users.bio}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import BaseButton from '../components/BaseButton'

  export default {
    components: { BaseButton },
    data () {
      return {
        loading: false
      }
    },

    computed: {
      ...mapState({
        users: state => state.users.current
      }),

      openPage: function() {
        location.href = currentUser.instaName;
}
    },

    watch: {
      '$route.params.username': {
        immediate: true,
        async handler (username) {
          this.loading = true
          try {
            await this.getPublicProfile({ username })
            this.loading = false
          } catch (err) {
            this.$router.push({ name: 'Home' })
            this.loading = false
          }
        }
      }
    },

    methods: {
      ...mapActions(['getPublicProfile'])
    }
  }
</script>

<style>
  .logo-view {
    margin-right: 4px
  }

  .emp-profile {
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
  }

  .profile-img {
    text-align: center;
  }

  .profile-img img {
    width: 70%;
    height: 100%;
  }

  .profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
  }

  .profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
  }

  .profile-head h5 {
    color: #333;
  }

  .profile-head h6 {
    color: #0062cc;
  }

  .profile-edit-btn {
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 4%;
    font-weight: 600;
    color: white;
    cursor: pointer;
    font-style: normal;
    background-color: #0062cc;
  }

  .proile-rating {
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
  }

  .proile-rating span {
    color: #495057;
    font-size: 15px;
    font-weight: 600;
  }

  .profile-head .nav-tabs {
    margin-bottom: 5%;
  }

  .profile-head .nav-tabs .nav-link {
    font-weight: 600;
    border: none;
  }

  .profile-head .nav-tabs .nav-link.active {
    border: none;
    border-bottom: 2px solid #0062cc;
  }

  .profile-work {
    padding: 14%;
    margin-top: -15%;
  }

  .profile-work p {
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
  }

  .profile-work a {
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
  }

  .profile-work ul {
    list-style: none;
  }

  .profile-tab label {
    font-weight: 600;
  }

  .profile-tab p {
    font-weight: 600;
    color: #0062cc;
  }
</style>
