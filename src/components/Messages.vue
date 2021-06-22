<template>
  <div>
    <div v-for="(message, id) in messages" v-bind:key="id">
      <div class="chat-message col-md-5"
           v-bind:class="[(message.fromUser.toLocaleString().localeCompare(active_chat) === 0) ? 'to-message' : 'from-message offset-md-7']">
        <div class="entete">
          <h2>{{(message.fromUser.toLocaleString().localeCompare(active_chat) === 0) ? active_chat_name : currentUser.name}}</h2>
          <h3>{{ message.createdAt | humanizeDate}}</h3>
        </div>
        {{message.message}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Messages',
    props: {
      messages: Array,
      active_chat: String,
      active_chat_name: String
    }
  }
</script>
<style>
  .from-message {
    background: #1a55b8;
    color: white;
    border-radius: 3px;
    padding: 8px 2px;
    margin-bottom: 10px;
    white-space: normal;
    word-wrap: break-word;
  }

  .to-message {
    background: rgb(201, 209, 209);
    color: rgb(41, 53, 52);
    border-radius: 3px;
    padding: 8px 2px;
    margin-left:10px;
    margin-bottom: 10px;
    white-space: normal;
    word-wrap: break-word;

  }

  .entete h2 {
    margin-right: 5px
  }

  .entete {
    margin-bottom: 5px;
  }
</style>
