<template>
  <div>
    <div id="box" class="user" v-for="(user, id) in users" v-bind:key="id">
      <chat-avatar class="avatar" :src="user.avatarLocation"></chat-avatar>
      <div
        v-bind:class="[activeUser === user.id ? 'active' : 'non-active']"
        v-on:click="chat(user.id)"
      >
        <h2>{{user.username}}</h2>
        <span v-if="user.has_new_message" class="has_new_message">New message</span>
      </div>
    </div>
  </div>
</template>
<script>
  import ChatAvatar from './ChatAvatar'

  export default {
    name: 'Users',
    components: { ChatAvatar },
    props: {
      users: Array
    },
    data () {
      return {
        activeUser: null
      }
    },
    methods: {
      chat: function (id) {
        this.activeUser = id
        this.$emit('chat', id)
      }
    }
  }
</script>
<style scoped>
  .user {
    padding-top:30px;
    padding-bottom: 50px;
    width: 250px;
    height:70px;
    border-bottom: 1px solid gray;
  }

  .user:hover {
    background-color: #5e616a;
  }


  .avatar {
    border-radius: 50%;
    margin-left: 20px;
    text-align: center;
  }


  .active + .user {
     background-color: #5e616a;
  }

  h2 {
    font-size: 14px;
    color: #fff;
    margin-top: -35px;
    font-weight: normal;
    margin-left: 85px;
  }

   h3 {
    font-size: 12px;
    color: #7e818a;
    font-weight: normal;
  }

  .has_new_message {
    background-color: #17a2b8;
    border-radius: 4px;
    display: inline-block;
    color: white;
    font-size: 10px;
    margin: 4px;
    padding: 3px;
    font-weight: bolder;
  }
</style>
