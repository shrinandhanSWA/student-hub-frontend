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
        <div class="header2">
        
          <div class="dropdown">
            <button class="basic-button">Sort By</button>
              <div class="dropdown-content">
                <a href="#">Popularity</a>
                <a href="#">Newest</a>
                <a href="#">Most Viewed</a>
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
import { mapState, mapActions } from 'vuex'

import TopicsList from '@/components/TopicsList'

export default {
  components: { TopicsList },
  data () {
    return {
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
          await this.loadTopics({ filters: { categorySlug } ,
             data: {
               voteSort: true
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
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 10px

.header2
  justify-content: space-between
  align-items: center
  margin-bottom: 10px

button {
  border: 0
  padding: 8.5px 12px
  border-radius: 2px
  outline: none
  cursor: pointer
  background-color: $buttonColor
  transition: 0.2s background ease-out
  text-decoration: none
  display: inline-block
  text-align: center
  color: white
  margin-right: 20px
}


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
  position: relative;
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

</style>
