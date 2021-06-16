<template>
  <form
    class="register-form page-form"
    @submit.prevent="submit"
  >
    <span class="error-message">
      {{ serverErrorMessage }}
    </span>
    <div class="field">
      <label class="label">
        Name
      </label>
      <base-input
        v-model="name"
        :errors="$v.name"></base-input>
    </div>
    <div class="field">
      <label class="label">
        Username
      </label>
      <base-input
        v-model="username"
      ></base-input>
    </div>
    <div class="field">
      <label class="label">
        Email
      </label>
      <base-input
        v-model="email"
        type="email"
        :errors="$v.email"></base-input>
    </div>
    <div class="field">
      <label class="label">
        Password
      </label>
      <base-input
        v-model="password"
        type="password"
        :errors="$v.password"></base-input>
    </div>
    <div class="field">
      <label class="label">
        Role
      </label>
      <base-select-input
        v-model="role"
        :options="roleOptions"></base-select-input>
    </div>
    <div class="field">
      <label class="label">
        Which school do/did you attend?
      </label>
      <base-select-input
        v-model="school"
        :options="schoolOptions"
        :errors="$v.school"></base-select-input>
    </div>

      <div class="field"
            v-if="this.school === 'HWSF' ">
        <label class="label">
          HWSF Number (if known)
        </label>
        <base-input
          v-model="schoolId"
          :errors="$v.schoolId"></base-input>
      </div>

      <div class="field"
           v-if="this.school === 'Other' "
           v-model="school">
        <label class="label">
          Which school do/did you attend?
        </label>
        <base-input
          v-model="otherSchool"
          :errors="$v.otherSchool"></base-input>
      </div>

      <div
        v-if="role === 'moderator'"
        class="field"
      >
        <label class="label">
          Which uni do you attend?
        </label>
        <base-input
          v-model="uni"></base-input>
      </div>
      <div
        v-if="role === 'moderator'"
        class="field"
      >
        <label class="label">
          Which year did you graduate?
        </label>
        <base-input
          v-model="yearOfGrad">
        </base-input>
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
    <base-button
      :disabled="loading"
    >
      {{ loading ? 'Signing Up...' : 'Sign Up' }}
    </base-button>
  </form>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { email, required } from 'vuelidate/lib/validators'
  import BaseSelectInput from './BaseSelectInput'

  export default {
    components: { BaseSelectInput },
    data () {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'user',
        profileType: 'student',
        school: '',
        uni: '',
        interests: '',
        hobbies: '',
        moderateCategory: '',
        serverErrorMessage: '',
        loading: false,
        loadingCategories: false,
        schoolId : null,
        yearOfGrad: null,
        otherSchool: ''
      }
    },

    validations: {
      name: { required },
      username: { required },
      email: { required, email },
      password: { required },
      school: { required }
    },

    computed: {
      ...mapState({
        categories: state => state.categories.all
      }),

      roleOptions () {
        return [
          { key: 'user', title: 'Student' },
          { key: 'moderator', title: 'Alumni' }
        ]
      },
      schoolOptions () {
        return [
          { key: 'HWSF', title: 'HWSF' },
          { key: 'Other', title: 'Other' }
        ]
      }
    },

    methods: {
      ...mapActions(['registerUser']),
      async submit () {
        this.$v.$touch()
        if (!this.$v.$anyError) {
          try {
            this.loading = true
            await this.registerUser({
              data: {
                username: this.username,
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role,
                moderateCategory: this.moderateCategory,
                uni: this.uni,
                interests: this.interests,
                hobbies: this.hobbies,
                schoolId: this.schoolId,
                yearOfGrad: this.yearOfGrad, 
                ...(this.school === 'HWSF' ? { school : this.school } : {school : this.otherSchool})
              }
            })
            this.loading = false
            this.$router.push({ name: 'Login' })
          } catch (err) {
            this.serverErrorMessage = err.data.message
            this.loading = false
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .field
    margin-bottom: 20px

  .label
    display: block
    margin-bottom: 3px

  .base-button
    width: 100%

  .error-message
    text-align: center
    display: block
    margin-bottom: 10px
    color: $errorColor

  .categories-spinner
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 15px
</style>
