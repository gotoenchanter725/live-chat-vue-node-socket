<template>
  <div class="h-100">
    <div
      class="chatbox-container row no-gutters flex-column"
      v-if="getChatView"
    >
      <div class="profile col-auto">
        <img
          class="image"
          src="http://soho.laborasyon.com/default/dist/media/img/man_avatar3.jpg"
        />
        <div class="detail">
          <p class="name">
            {{ getFriendNumber(getChatView.rooms.participant) }}
          </p>
          <small class="status">Online</small>
        </div>
      </div>
      <div class="chats col pr-4" id="chats-container">
        <div
          class="chat"
          :class="list.user === getProfile._id ? 'active' : ''"
          v-for="list in getChatView.chats"
          v-bind:key="list"
        >
          <div class="text">{{ list.message }}</div>
          <span>{{ new Date(list.Date).toDateString() }}</span>
        </div>
      </div>
      <div class="chat-search col-auto">
        <form>
          <input
            type="text"
            class="form-control"
            v-model="message"
            placeholder="Say hi.."
          />
          <input type="submit" class="d-none" v-on:click="sendMessage" />
        </form>
      </div>
    </div>
    <div
      class="
        chatbox-container
        h5
        mb-0
        font-weight-bold
        row
        no-gutters
        flex-column
        align-items-center
        justify-content-center
      "
      v-else
    >
      Select and start chatting
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ChatBox",
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapGetters(["getChatView", "getSocket", "getProfile"]),
  },
  mounted() {
    this.scrollToBottom();
  },
  unmounted() {
    this.getSocket.on("leave room", this.getChatView.room);
    this.getSocket.close();
  },
  methods: {
    ...mapActions(["updateChatView", "UpdateChat"]),
    getFriendNumber: function (participant) {
      return participant.find((data) => this.getProfile.mobileNumber !== data);
    },
    sendMessage: function (e) {
      e.preventDefault();
      this.getSocket.emit("new message", this.getChatView.room, this.message);
      this.message = "";
    },
    init() {
      this.getSocket.emit("join room", this.getChatView.room, this.getProfile);
      this.getSocket.off("message").on("message", this.UpdateChat);
    },
    scrollToBottom() {
      let scrollbarContainer = document.getElementById("chats-container");
      if (scrollbarContainer) {
        setTimeout(() => {
          scrollbarContainer.scrollTo(0, scrollbarContainer.scrollHeight);
        }, 200);
      }
    },
  },
  watch: {
    "getChatView.room": {
      handler(room) {
        if (room) {
          this.init();
        }
      },
    },
    "getChatView.chats": {
      handler() {
        this.scrollToBottom();
      },
    },
  },
};
</script>