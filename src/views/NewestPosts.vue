<template>
  <div class="app-page category-page">
    <base-spinner
      v-if="loading"
      class="page-spinner"></base-spinner>
    <template v-else>
      <div class="header">
        <span class="title">
          {{ currentCategory.title }}
        </span>
        <div class="right-header">
          <div class="dropdown">
            <button class="dropdown-button" v-if="isLoggedIn">
              <i class="fas fa-caret-down fa-lg"></i>
              Sort By
            </button>
            <div class="dropdown-content">
              <router-link  :to="{name :'Category'}">Most Popular</router-link>
              <router-link  :to="{name :'NewestPosts'}">Most Recent</router-link>
              <router-link  :to="{name :'MostViewed'}">Most Viewed</router-link>
            </div>
          </div>
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

  import { mapActions, mapState } from 'vuex'
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
            await this.loadTopics({
              filters: { categorySlug },
              data: {
                voteSort: this.voteSort,
                voteViews: false
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
    }
  }
</script>

<style lang="stylus" scoped>

  .title{
    margin-left : 125px
  }

  .header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 10px

  .dropdown-design
    border: 0
    margin-right: 40px
    padding: 11px 15px
    border-radius: 6px
    outline: none
    cursor: pointer
    transition: 0.2s background ease-out
    text-decoration: none
    display: inline-block
    text-align: center

  .right-header
    justify-content: space-between
    align-items: center
    margin-bottom: 10px
    margin-right: -100px
    display: flex

  .plus-icon
    margin-right: 5px

  .title
    color: #666

  .dropbtn {
    background-color: $buttonColor;
    color: white;
    padding: 16px;
    margin-right: 20px;
    height: 40px;
    font-size: 16px;
    border: none;

  }

  .dropdown {
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown:hover .dropbtn {
    background-color: #270145;
  }

  .new-topic-button
    font-size: 14px

  .dropdown-button
    margin-right: 40px
    font-size: 14px
    border: 0
    padding: 12px 15px
    border-radius: 6px
    outline: none
    cursor: pointer
    transition: 0.2s background ease-out
    text-decoration: none
    text-align: center
    color: white
    background-color: $buttonColor

  .sort-by-button
    margin-right: 10px
    font-size: 14px

</style>
