<template>
  <div class="category-item">
    <base-confirm-dialog
      v-if="showConfirmDialog"
      confirm-button-title="Leave"
      dismiss-button-title="cancel"
      @dismiss="showConfirmDialog = false"
      @confirm="deleteCurrentUserGroup({ categorySlug: category.slug })"
    >
      <template #title>
        Do you want to leave {{category.title}} ?
      </template>
      <template #default>
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
          v-if="isLoggedIn && currentUser.can('categories:write')"
          :to="{ name: 'EditCategory', params: { categorySlug: category.slug } }"
        >
          <i
            class="action-button fas fa-pencil-alt"
          ></i>
        </router-link>
        <i id="leaveBlock"
           v-if="isLoggedIn"
           class="leave-button"
           @click.prevent.stop="showConfirmDialog= true"
        >Leave</i>
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
      showConfirmDialog: false
    }
  },

  methods: {
    ...mapActions(['deleteCurrentUserGroup'])
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

.action-button:hover
  color: lighten($primaryColor, 20%)

.leave-button {
  display: inline-block;
  padding: .3rem 1rem;
  margin-left: 1.3em;
  font-style : normal;
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

</style>
