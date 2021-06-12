<template>
  <form
    class="MoreInformation page-form"
    @submit.prevent="submit"
  >
    <span class="error-message">
      {{ serverErrorMessage }}
    </span>
    <div class="field">
      <label class="label">
        Which school do/did you attend?
      </label>
      <base-input
        v-model="school"
        :errors="$v.school"></base-input>
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
    <div
      v-if="currentUser.role === 'moderator'"
      class="field"
    >
      <label class="label">
        Which uni do you attend?
      </label>
      <base-input
        v-model="uni"></base-input>
    </div>
    <base-button
      :disabled="loading"
    >
      {{ loading ? 'Updating ....' : 'Update' }}
    </base-button>
  </form>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import required from 'vuelidate/src/validators/required'

  export default {
    data () {
      return {
        school:'',
        uni:'',
        interests:'',
        hobbies:'',
        role:'',
        loading: false,
      }
    },

    validations: {
      school: { required },
    },

    methods: {
      ...mapActions(['updateExtraUserInfo']),
      async submit () {
        this.$v.$touch()
        if (!this.$v.$anyError) {
          try {
            this.loading = true
            await this.updateExtraUserInfo({
              data: {
                school: this.school,
                uni: this.uni,
                interests: this.interests,
                hobbies: this.hobbies
              }
            })
            this.loading = false
            this.$router.push({ name: 'Home' })
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
