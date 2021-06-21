<template>
  <div
    class="base-avatar"
    :class="{ 'name': src==='' }"
    :style="{
      'background-image': src==='' ? `url(https://firebasestorage.googleapis.com/v0/b/drp-project-database.appspot.com/o/451-4517876_default-profile-hd-png-download.png?alt=media&token=e332e850-83d5-4224-a000-6f108d8e1833)` : `url(${src})`,
      'background-color': src==='' ? backgroundColor : '',
      'width': `${size}px`,
      'min-width': `${size}px`,
      'height': `${size}px`,
      'min-height': `${size}px`
    }"
  >
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: ''
      },

      name: {
        type: String,
        default: ''
      },

      size: {
        type: Number,
        default: 50
      }
    },

    computed: {
      backgroundColor () {
        const name = this.name.toUpperCase()
        const hue = name.split('').reduce((acc, cur, index) => {
          acc += name.charCodeAt(index)
          return acc
        }, 0)
        return `hsl(${hue % 360}, 60%, 50%)`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .base-avatar
    border-radius 50%
    background-position 50% 50%
    background-size cover
    background-repeat no-repeat

  .base-avatar.name
    display flex
    align-items: center
    justify-content: center

  .name-letter
    color: #FFF
    font-size: 17px
    font-weight bold
    user-select none
    text-transform uppercase
</style>
