<template>
  <div class="register-page app-page">
    <div class="page-form-container">
      <h1 class="page-form-title">
        More About You
      </h1>
      <more-information-form/>
    </div>
  </div>
</template>

<script>
import MoreInformationForm from '@/components/MoreInformationForm'

export default {
  components: { MoreInformationForm }
}
</script>

<style lang="stylus" scoped>
.page-form-container
  max-width: 500px
</style>
