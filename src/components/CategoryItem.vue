<template>
  <div class="category-item">
    <base-confirm-dialog id="joinBlock"
                         v-if="showConfirmDialog"
                         confirm-button-title="join"
                         dismiss-button-title="cancel"
                         @dismiss="showConfirmDialog = false"
                         @confirm="updateCurrentUserGroups({ categorySlug: category.slug })"
    >
      <template #title>
        Do you want to join '{{category.title}}' ?
      </template>
      <template #default>
        By clicking Join, '{{category.title}}' will be in 'my groups'
      </template>
    </base-confirm-dialog>

    <base-confirm-dialog id="delBlock"
                         v-if="showConfirmDelete"
                         confirm-button-title="delete"
                         dismiss-button-title="cancel"
                         @dismiss="showConfirmDelete = false"
                         @confirm="deleteCategory({ categorySlug: category.slug })"
    >
      <template #title>
        Do you really want to delete the group {{category.title}} ?
      </template>
      <template #default>
        You cannot undo this action.
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
        <router-link
          v-if="isLoggedIn && currentUser.can('categories:delete')"
          :to="{ name: 'EditCategory', params: { categorySlug: category.slug } }"
        >
          <i
            class="action-button fas fa-pencil-alt"
          ></i>
        </router-link>
        <i id="joinBlock"
           v-if="isLoggedIn"
           class="join-button"
           @click.prevent.stop="showConfirmDialog= true"
        >Join</i>
        <i id="delBlock"
           v-if="isLoggedIn && currentUser.can('categories:delete')"
           class="action-button fas fa-trash-alt"
           @click.prevent.stop="showConfirmDelete = true"
        ></i>
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
        showConfirmDelete: false
      }
    },

    methods: {
      ...mapActions(['updateCurrentUserGroups', 'deleteCategory'])
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
    margin-left: 15px
    color: white
    cursor: pointer
    background-color: $primaryColor
    font-style: normal
    padding-left: 1em
    padding-right: 1em
    border-radius : 10px
  }

  .join-button:hover{
    background-color: lighten($primaryColor, 20%)
  }


  .action-button:hover
    color: lighten($primaryColor, 20%)

</style>
