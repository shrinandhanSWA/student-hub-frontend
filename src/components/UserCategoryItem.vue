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
        <router-link class="link"
          v-if="newPosts"
          :to="{ name: 'Category', params: { categorySlug: category.slug } }"
        >
        <div class="circle">{{ this.missingPosts }}</div>
        </router-link>
        <router-link
          v-if="isLoggedIn && currentUser.can('categories:delete')"
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
      showConfirmDialog: false,
      newPosts: false,
      missingPosts: 0
    }
  },

  methods: {
    ...mapActions(['deleteCurrentUserGroup', 'checkNewPosts'])
  },

  async mounted () {
      try {
        const {out, diff} = await this.checkNewPosts({
        categorySlug: this.category.slug,
          data: {
            email: this.currentUser.email
          }
        })
        this.newPosts = out
        this.missingPosts = diff

      } catch (err) {
        this.loading = false
        this.error = true
      }
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

.circle {
  width: 30px
  height: 30px
  line-height: 30px
  border-radius: 50%
  font-size: 15px
  color: black
  text-align: center
  background: #00cc00
}

.link {
  text-decoration: none
}

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
  margin-left: 15px
  color: white
  cursor: pointer
  background-color: $primaryColor
  font-style: normal
  padding-left: 1em
  padding-right: 1em
  border-radius : 10px
}

.leave-button:hover{
  background-color: lighten($primaryColor, 20%)
}


</style>
