<template>
  <div id="chat">
    <b-container>
      <b-row class="main-area">
        <b-col cols="4" class="users">
          <Users :users="users" v-on:chat="chat"/>
        </b-col>
        <b-col cols="8" class="messages-area">
          <div class="messages-main">
            <div
              v-if="!current_chat_channel"
              class="select-chat text-center"
            >
              Select a user to start chatting...

            </div>
            <Messages
              v-else
              :active_chat="active_chat_id"
              :messages="messages[current_chat_channel]"
            />
          </div>
          <MessageInput v-on:send_message="send_message"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
  import MessageInput from '@/components/MessageInput.vue'
  import Messages from '@/components/Messages.vue'
  import Users from '@/components/Users.vue'
  import Pusher from 'pusher-js'
  import { mapActions } from 'vuex'

  // Declare pusher variable so it's global to this file.
  let pusher

  export default {
    name: 'chat',
    components: {
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
        test: null
      }

    },
    async mounted () {
      //new method
      const user = await this.chatLogin(
        {
          data: {
            username: this.currentUser.username,
          }
        })

      //new update the states
      this.logged_user_id = user.id
      this.logged_user_username = user.username

      // Initialize Pusher JavaScript library
      pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
        cluster: process.env.VUE_APP_PUSHER_CLUSTER,
        authEndpoint: ' http://localhost:5001/test/pusher/auth',
        auth: {
          headers: {
            Authorization: 'Bearer ' + (localStorage.getItem('auth_token'))
          }
        }
      })

      //new Get all the users from the server
      const users = await this.getChatUsers()

      // Get all users excluding the current logged user
      this.users = users.filter(a => a.username !== user.username)

      var notifications = pusher.subscribe(
        `private-notification_user_${this.logged_user_id}`
      )

      notifications.bind('new_chat', data => {
        const isSubscribed = pusher.channel(data.channel_name)
        if (!isSubscribed) {
          const one_on_one_chat = pusher.subscribe(data.channel_name)

          this.$set(this.messages, data.channel_name, [])

          one_on_one_chat.bind('new_message', data => {
            // Check if the current chat channel is where the message is coming from
            if (
              data.channel !== this.current_chat_channel &&
              data.from_user !== this.logged_user_id
            ) {
              // Get the index of the user that sent the message
              const index = this.users.findIndex(
                user => user.id === data.from_user
              )

              // Set the has_new_message status of the user to true
              this.$set(this.users, index, {
                ...this.users[index],
                has_new_message: true
              })
            }

            this.messages[data.channel].push({
              message: data.message,
              sentiment: data.sentiment,
              from_user: data.from_user,
              to_user: data.to_user,
              channel: data.channel
            })
          })
        }
      })
    },
    methods: {
      ...mapActions(
        ['login', 'chatLogin', 'getChatUsers', 'getChatMessage', 'requestChat', 'sendMessage']),

      getMessage: async function (channel_name) {
        const res = await this.getChatMessage({ data: { channel_name } })
        this.$set(this.messages, channel_name, res)
      },

      chat: async function (id) {
        this.active_chat_id = id

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
            from_user: this.logged_user_id,
            to_user: this.active_chat_id
          }
        })

        this.users[this.active_chat_index]['channel_name'] =
          response.data.channel_name

        this.current_chat_channel = response.data.channel_name

        // Get messages on this channel
        this.getMessage(response.data.channel_name)

        var isSubscribed = pusher.channel(response.data.channel_name)

        if (!isSubscribed) {
          var channel = pusher.subscribe(response.data.channel_name)

          this.$set(this.messages, response.data.channel_name, [])

          channel.bind('new_message', data => {
            //Check if the current chat channel is where the message is comming from

            if (
              data.channel !== this.current_chat_channel &&
              data.from_user !== this.logged_user_id
            ) {
              // Set the has_new_message status of the user to true
              this.$set(this.users, this.active_chat_index, {
                ...this.users[this.active_chat_index],
                has_new_message: true
              })
            }

            this.messages[response.data.channel_name].push({
              message: data.message,
              sentiment: data.sentiment,
              from_user: data.from_user,
              to_user: data.to_user,
              channel: data.channel
            })
          })
        }
      },

      send_message: async function (message) {

        await this.sendMessage({
          data:
            {
              from_user: this.logged_user_id,
              to_user: this.active_chat_id,
              message: message,
              channel: this.current_chat_channel
            }
        })
      }

    }
  }

</script>

<style>
  .messages-main {
    overflow-y: scroll;
    padding: 10px;
    height: 90%;
  }

  .users {
    padding: 0px !important;
    border: 1px solid gray;
  }

  .no-margin {
    margin: 0px;
  }

  .messages-area {
    border: 1px solid gray;
    padding: 0px !important;
    max-height: 630px;
  }

  .input-message {
    height: 40px;
  }

  .select-chat {
    margin-top: 35vh;
    padding: 8px;
  }

  .main-area {
    margin-top: 10px;
    margin-left: 60px;
    min-height: 630px;
  }

  .logged_user {
    color: white;
  }
</style>
