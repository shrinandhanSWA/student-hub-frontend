<template>
  <div class="category-item">
    <base-confirm-dialog id="joinBlock"
                         v-if="showConfirmDialog"
                         confirm-button-title="join"
                         dismiss-button-title="cancel"
                         @dismiss="showConfirmDialog = false"
                         @confirm="joinSuggestedCategory({ categorySlug: category.slug })"
    >
      <template #title>
        Do you want to join '{{category.title}}' ?
      </template>
      <template #default>
        By clicking Join, '{{category.title}}' will be in 'my groups'
      </template>
    </base-confirm-dialog>
    <router-link
      class="category-item-link"
      :to="{ name: 'Category', params: { categorySlug: category.slug } }"
      :style="{ 'border-color': category.color }"
    >
      <div class="content">
        <h1 class="title">
          {{ category.title }}
        </h1>
        <p class="description">
          {{ category.description }}
        </p>
      </div>
      <div class="actions">
        <i id="joinBlock"
           v-if="isLoggedIn"
           class="join-button"
           @click.prevent.stop="showConfirmDialog= true"
        >Join</i>
      </div>
    </router-link>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      category: {
        type: Object,
        default: () => ({})
      }
    },

    data () {
      return {
        join: false,
        showConfirmDialog: false,
      }
    },

    methods: {
    ...mapActions(['joinSuggestedCategory'])
  }
  }
</script>

<style lang="stylus" scoped>
  .category-item-link
    background: #FFF
    padding: 15px
    cursor: pointer
    transition: 0.2s background ease-out
    border-left: 5px solid
    box-shadow: 0 1px 5px 0 hsla(0, 0, 0, 0.2)
    border-radius: 4px
    display: flex
    text-decoration: none
    justify-content: space-between

  .category-item:hover
    background: #F9F9F9

  .title
    font-size: 20px
    margin: 0
    font-weight 400
    color: #000

  .description
    color: #999
    margin: 10px 0 0

  .actions
    display: flex
    justify-content: flex-end
    align-items: center

  .action-button
    margin-left: 15px
    color: $primaryColor
    cursor: pointer

  .join-button {
    display: inline-block;
    padding: .3rem 1rem;
    margin-left: 1.3em;
    font-style: normal;
    border-radius: 10rem;
    color: #fff;
    font-size: 1rem;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 1;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $primaryColor;
      border-radius: 10rem;
      z-index: -2;
    }

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: darken($primaryColor, 15%);
      transition: all .3s;
      border-radius: 10rem;
      z-index: -1;
    }

    &:hover {
      color: #fff;

      &:before {
        width: 100%;
      }
    }
  }


  .action-button:hover
    color: lighten($primaryColor, 20%)

</style>
