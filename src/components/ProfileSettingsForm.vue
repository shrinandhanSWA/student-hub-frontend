<template>
  <div class="profile-settings-form page-form">
    <div class="field image-field">
<!--      <base-image-input-->
<!--        :value="currentUser.avatarLocation"-->
<!--        :width="250"-->
<!--        :height="250"-->
<!--        :crop="true"-->
<!--        @input="avatar = arguments[0]"></base-image-input>-->
      <input type="file" @change="previewImage" accept="image/*">
      <p>Progress: {{uploadValue.toFixed()+'%'}}
        <progress id="progress" :value="uploadValue" max="100"></progress>
      </p>
      <div v-if="imageData!=null">
        <img class="preview" :src="picture">
        <br>
        <button @click="onUpload">Upload</button>
      </div>
    </div>
    <div class="field">
      <label class="label">Name</label>
      <base-input
        v-model="name"
        :errors="$v.name"></base-input>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <base-input
        v-model="email"
        :errors="$v.email"></base-input>
    </div>
    <div class="field">
      <label class="label">
        Which school do/did you attend?
      </label>
      <base-input
        v-model="school"
        :errors="$v.school"></base-input>
    </div>
    <div
      v-if="this.currentUser.role === 'moderator'"
      class="field"
    >
      <label class="label">
        Which uni do you attend?
      </label>
      <base-input
        v-model="uni"></base-input>
    </div>
    <div class="field">
      <label class="label">
        What are your top 3 interests? (academic or non-academic)
      </label>
      <base-input
        v-model="interests"></base-input>
    </div>
    <div class="field">
      <label class="label">
        What are your top 3 hobbies?
      </label>
      <base-input
        v-model="hobbies"></base-input>
    </div>
    <div class="field">
      <label class="label">
        What are you looking for?
      </label>
      <base-input
        v-model="lookingFor"></base-input>
    </div>
    <div class="field">
      <label class="label">
        Instagram username:
      </label>
      <base-input
        v-model="instaName"></base-input>
    </div>
    <div class="field">
      <label class="label">
        Snapchat username:
      </label>
      <base-input
        v-model="snapName"></base-input>
    </div>
    <div class="field">
      <label class="label">
        Bio
      </label>
    </div>
    <textarea
      style="width: 450px; height: 150px;"
      maxlength="275"
      v-model="bio"></textarea>
    <div class="submit-field">
      <span
        v-if="errorMessage"
        class="error-message"
      >
        {{ errorMessage }}
      </span>
      <span
        v-if="success"
        class="success-message"
      >
        <i class="fas fa-check"></i> Saved
      </span>
      <base-button
        :disabled="loading"
        @click="onSubmit"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </base-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { email, required } from 'vuelidate/lib/validators'
  import firebase from 'firebase'
  import BaseButton from './BaseButton'

  export default {
    components: { BaseButton },
    data () {
      return {
        uploadValue: 0,
        imageData: null,
        picture: null,
        loading: false,
        errorMessage: '',
        success: false,
        email: '',
        name: '',
        school: '',
        uni: '',
        interests: '',
        hobbies: '',
        lookingFor: '',
        bio: '',
        avatar: null,
        snapName: '',
        instaName: '@',
        avatarLocation: ''
      }
    },

    validations: {
      email: { required, email },
      name: { required }
    },

    mounted () {
      this.name = this.currentUser.name
      this.email = this.currentUser.email
      this.school = this.currentUser.school
      this.uni = this.currentUser.uni
      this.interests = this.currentUser.interests
      this.hobbies = this.currentUser.hobbies
      this.lookingFor = this.currentUser.lookingFor
      this.bio = this.currentUser.bio
      this.instaName = this.currentUser.instaName
      this.snapName = this.currentUser.snapName
      this.avatarLocation = this.currentUser.avatarLocation
    },

    methods: {
      ...mapActions(['updateCurrentUserProfile']),
      async onSubmit () {
        this.$v.$touch()
        if (!this.$v.$anyError) {
          this.loading = true
          try {
            await this.updateCurrentUserProfile({
              data: {
                name: this.name,
                email: this.email,
                school: this.school,
                uni: this.uni,
                interests: this.interests,
                hobbies: this.hobbies,
                lookingFor: this.lookingFor,
                bio: this.bio,
                instaName: this.instaName,
                snapName: this.snapName,
                avatarLocation: this.picture
              }
            })
            this.loading = false
            this.success = true
            setTimeout(() => {
              this.success = false
            }, 4000)
          } catch (err) {
            this.errorMessage = 'An error occured while updating your profile.'
            this.loading = false
          }
        }
      },
      previewImage (event) {
        this.uploadValue = 0
        this.picture = null
        this.imageData = event.target.files[0]
      },
      onUpload () {
        this.picture = null
        const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
        storageRef.on(`state_changed`, snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          }, error => {
            console.log(error.message)
          },
           () => {
            this.uploadValue = 100
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.picture = url
            })
          }
        )
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .field
    margin-bottom: 20px

  .image-field
    width: 100%
    display: flex
    justify-content: center
    align-items: center

  .label
    margin-bottom: 3px
    display: block

  .submit-field
    display: flex
    justify-content: flex-end
    align-items: center

  .error-message
    color: $errorColor
    text-align: left
    flex: 1

  .success-message
    color: $successColor
    text-align: left
    flex: 1

  .big-box
    size = "sm"

  img.preview {
    width: 200px;
  }

</style>
