<template>
  <div id="container">
    <aside>
      <header>
        <b-form-input
          @input="search_text()"
          v-model="search.text"
          type="text"
          placeholder="Search by Name"
        ></b-form-input>
      </header>
      <ul>
        <Users
          :users="searchedUsers.length === 0 ? users : searchedUsers" v-on:chat="chat"/>
      </ul>
    </aside>
    <main id="main">
      <header>
        <chat-avatar
          class="avatar"
          v-if="current_chat_channel"
          :src="active_user_avatar" :size="70"></chat-avatar>
        <div v-if="current_chat_channel">
          <h2
          >Chat with {{active_user_name}}</h2>
          <h3>
            {{messages_length}} messages exchanged
          </h3>
        </div>
      </header>
      <ul id="chat" ref="chatbox">
        <li
          v-if="!current_chat_channel"
          class="select-chat text-center"
        >
          Select a user to start chatting...
        </li>

        <Messages
          v-else
          :active_chat="active_chat_id"
          :active_chat_name="active_user_name"
          :messages="messages[current_chat_channel]"
        />
      </ul>
      <footer>
        <MessageInput id="message-input" v-on:send_message="send_message"/>
      </footer>
    </main>
  </div>
</template>
<script>

  import MessageInput from '@/components/MessageInput.vue'
  import Messages from '@/components/Messages.vue'
  import Users from '@/components/Users.vue'
  import Pusher from 'pusher-js'
  import { mapActions } from 'vuex'
  import ChatAvatar from '../components/ChatAvatar'

  // Declare pusher variable so it's global to this file.
  let pusher

  export default {
    name: 'chat',
    components: {
      ChatAvatar,
      MessageInput,
      Messages,
      Users
    },
    data: function () {
      return {
        messages: {},
        users: [],
        active_chat_id: null,
        active_chat_index: null,
        logged_user_id: null,
        logged_user_username: null,
        current_chat_channel: null,
        chatData: null,
        active_user_name: '',
        active_user_avatar: '',
        messages_length: 0,
        test: null,
        search: { text: '' },
        searchedUsers: [],
        incomingId: null
      }

    },
    async mounted () {
      //new method

      //new update the states
      this.logged_user_id = this.currentUser.id
      this.logged_user_username = this.currentUser.username

      // Initialize Pusher JavaScript library
      pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
        cluster: process.env.VUE_APP_PUSHER_CLUSTER,
        authEndpoint: 'https://student-alumni-hub-backend.herokuapp.com/test/pusher/auth',
        auth: {
          headers: {
            Authorization: 'Bearer ' + (localStorage.getItem('auth_token'))
          }
        }
      })

      //new Get all the users from the server
      const users = await this.getChatUsers()

      // Get all users excluding the current logged user
      this.users = users.filter(a => a.username !== this.currentUser.username)


      var notifications = pusher.subscribe(
        `private-notification_user_${this.logged_user_id}`
      )

      if(this.incomingId){
        //idk whats the bug with chat but calling it twice works so
        this.chat(this.incomingId)
        this.chat(this.incomingId)
      }

      notifications.bind('new_chat', data => {

        const isSubscribed = pusher.channel(data.channel_name)

        if (!isSubscribed) {
          const one_on_one_chat = pusher.subscribe(data.channel_name)

          this.$set(this.messages, data.channel_name, [])

          one_on_one_chat.bind('new_message', async (data) => {

            // Check if the current chat channel is where the message is coming from
            if (data.channel !== this.current_chat_channel &&
              data.fromUser !== this.logged_user_id
            ) {
              // Get the index of the user that sent the message
              const index = this.users.findIndex(
                user => user.id === data.fromUser
              )

              // Set the has_new_message status of the user to true
              this.$set(this.users, index, {
                ...this.users[index],
                has_new_message: true
              })
            }

            this.messages[data.channel].push({
              message: data.message,
              fromUser: data.fromUser,
              toUser: data.toUser,
              channel: data.channel,
              createdAt: Date.now()
            })

          })
        }
      })
    },
    watch: {
      '$route.params.id': {
        immediate: true,
        async handler (id) {
            this.incomingId =  id
        }
      }
    },
    methods: {
      ...mapActions(
        ['login', 'getChatUsers', 'getChatMessage', 'requestChat', 'sendMessage']),

      search_text () {
        var inside = this
        this.searchedUsers = this.users.filter(function (user) {
          if (user.name.toLowerCase().indexOf(inside.search.text.toLowerCase()) !== -1) {
            return user
          }
        })

      },

      getMessage: async function (channel_name) {
        const res = await this.getChatMessage({ data: { channel_name } })
        this.messages_length = res.length

        this.$set(this.messages, channel_name, res)

      },

      chat: async function (id) {
        this.active_chat_id = id

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === this.active_chat_id) {
            this.active_user_avatar = this.users[i].avatarLocation
            this.active_user_name = this.users[i].name
            break
          }
        }

        // Get index of the current chatting user...
        this.active_chat_index = this.users.findIndex(
          user => user.id === this.active_chat_id
        )

        // Set the has_new_message status of the user to true
        this.$set(this.users, this.active_chat_index, {
          ...this.users[this.active_chat_index],
          has_new_message: false
        })

        //new
        const response = await this.requestChat({
          data: {
            fromUser: this.logged_user_id,
            toUser: this.active_chat_id
          }
        })

        this.users[this.active_chat_index]['channel_name'] =
          response.data.channel_name

        this.current_chat_channel = response.data.channel_name

        // Get messages on this channel
        await this.getMessage(response.data.channel_name)

        var isSubscribed = pusher.channel(response.data.channel_name)

        if (!isSubscribed) {
          var channel = pusher.subscribe(response.data.channel_name)

          this.$set(this.messages, response.data.channel_name, [])

          channel.bind('new_message', async (data) => {
            //Check if the current chat channel is where the message is comming from
            if (
              data.channel !== this.current_chat_channel &&
              data.fromUser !== this.logged_user_id
            ) {
              // Set the has_new_message status of the user to true
              this.$set(this.users, this.active_chat_index, {
                ...this.users[this.active_chat_index],
                has_new_message: true
              })
            }

            this.messages[response.data.channel_name].push({
              message: data.message,
              fromUser: data.fromUser,
              toUser: data.toUser,
              channel: data.channel,
              createdAt: Date.now()
            })
          })
        }

      },
      send_message: async function (message) {
        await this.sendMessage({
          data:
            {
              fromUser: this.logged_user_id,
              toUser: this.active_chat_id,
              message: message,
              channel: this.current_chat_channel,
              createdAt: Date.now()
            }
        })

        this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
          - this.$refs.chatbox.clientHeight
      }

    }
  }

</script>

<style lang="stylus">
  * {
    box-sizing: border-box;
  }

  #container {
    width: 1000px;
    height: 630px;
    background: #eff3f7;
    margin: 0 auto;
    font-size: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  aside {
    width: 260px;
    height: 630px;
    background-color: darken(#5161ce, 80%);
    display: inline-block;
    font-size: 15px;
    vertical-align: top;
  }

  main {
    width: 740px;
    height: 630px;
    display: inline-block;
    font-size: 15px;
    vertical-align: top;
  }

  aside header {
    padding: 30px 20px;
  }

  aside input {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 50px 0 20px;
    background-color: #5e616a;
    border: none;
    border-radius: 3px;
    color: #fff;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_search.png');
    background-repeat: no-repeat;
    background-position: 170px;
    background-size: 40px;
  }

  aside input::placeholder {
    color: #fff;
  }

  aside ul {
    padding-left: 0;
    margin: 0;
    list-style-type: none;
    overflow-y: scroll;
    height: 520px;
    color: white;
  }

  main header {
    height: 110px;
    padding: 30px 20px 30px 40px;
  }

  main header > * {
    display: inline-block;
    vertical-align: top;
  }

  main header img:first-child {
    border-radius: 50%;
  }

  main header img:last-child {
    width: 24px;
    margin-top: 8px;
  }

  main header div {
    margin-left: 10px;
    margin-right: 145px;
  }

  main header h2 {
    font-size: 16px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  main header h3 {
    font-size: 14px;
    font-weight: normal;
    margin-top: 5px
  }

  #chat {
    padding-left: 0;
    list-style-type: none;
    overflow-y: scroll;
    height: 455px;
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    display: flex;
    flex-direction: column-reverse;
  }

  #chat h3 {
    display: inline-block;
    font-size: 13px;
    font-weight: normal;
    color: white;
  }

  #chat h2 {
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    color: white;
  }

  main footer {
    height: 80px;
    display: flex
  }

  main footer #message-input {
    resize: none;
    border: none;
    display: block;
    margin-bottom: 30px;
    margin-left: 10px;
    width: 45%;
    height: 40px;
    border-radius: 3px;
    font-size: 13px;

  }

  main footer #message-input::placeholder {
    color: #ddd;
  }

  .select-chat {
    margin-top: 35vh;
    padding: 8px;
  }

  .avatar {
    margin-right: -1px;
    margin-top: -15px;
  }

  aside ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  aside ::-webkit-scrollbar-track {
    background: darken(#5161ce, 80%);
  }

  /* Handle */
  aside ::-webkit-scrollbar-thumb {
    background: gray;
  }

  /* Handle on hover */
  aside ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  main ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  main ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  main ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  main ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

</style>
