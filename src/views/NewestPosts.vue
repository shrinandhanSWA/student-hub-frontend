<template>
  <div class="app-page category-page">
    <base-spinner
      v-if="loading"
      class="page-spinner"
    />
    <template v-else>
      <div class="header">
        <span class="title">
          {{ currentCategory.title }}
        </span>
        <div class="right-header">
          <base-button
            v-if="isLoggedIn"
            class="sort-by-button"
            :to="{ name: 'Category' }"
          >
            View Popular
          </base-button>
          <base-button
            v-if="isLoggedIn && currentUser.can('own_topics:write')"
            class="new-topic-button"
            :to="{ name: 'CreateTopic' }"
          >
            <i class="fas fa-plus plus-icon"></i>
            New Post
          </base-button>
        </div>

      </div>
      <topics-list/>
    </template>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import TopicsList from '@/components/TopicsList'
import BaseButton from '../components/BaseButton'

export default {
  components: { BaseButton, TopicsList },
  data () {
    return {
      voteSort: false,
      loading: false
    }
  },

  computed: {
    ...mapState({
      currentCategory: state => state.categories.current
    })
  },

  watch: {
    '$route.params.categorySlug': {
      immediate: true,
      async handler (categorySlug) {
        this.loading = true
        try {
          await this.loadCurrentCategory({ categorySlug })
          await this.loadTopics({ filters: { categorySlug },
            data: {
              voteSort: this.voteSort
            }
          })
          this.loading = false
        } catch (err) {
          this.$router.push({ name: 'Home' })
          this.loading = false
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'loadTopics',
      'loadCurrentCategory'
    ])
    // newest: function () {
    //   this.voteSort = false
    // },
    // mostPopular: function () {
    //   this.voteSort = true
    // }
  }
}
</script>

<style lang="stylus" scoped>
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 10px

.right-header
  justify-content: space-between
  align-items: center
  margin-bottom: 10px

.plus-icon
  margin-right: 5px

.title
  color: #666

.dropbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #3e8e41;}

.new-topic-button
  font-size: 14px

.dropdown-button
  margin-right : 10px
  font-size: 14px

.sort-by-button
  margin-right : 10px
  font-size: 14px

</style>
