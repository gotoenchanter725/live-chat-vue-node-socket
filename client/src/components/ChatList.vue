<template>
  <div class="chat-list-container row no-gutters flex-column">
    <header
      class="d-flex align-items-center header justify-content-between col-auto"
    >
      <h5>Chats</h5>
    </header>
    <div class="chat-search py-4 col-auto">
      <input type="text" class="form-control" placeholder="Search Chat" />
    </div>
    <div class="col overflowY-scroll">
      <div class="chats">
        <div class="text-center py-4" v-if="isLoading">
          <div class="spinner-border text-center"></div>
        </div>
        <div
          class="chat"
          v-else
          v-for="chat in getChatList.chatList"
          v-bind:key="chat"
          v-on:click="updateChatView(chat)"
        >
          <img
            src="http://soho.laborasyon.com/default/dist/media/img/man_avatar1.jpg"
          />
          <div class="detail">
            <h6>{{ getFriendNameOrNumber(chat.rooms.participant) }}</h6>
            <!-- <p>Lorem ipsum</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { chatAPI } from "@/services/apiVariables";
import service from "@/services";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["getChatList", "getSocket", "getProfile"]),
  },
  mounted() {
    this.fetchChatList();
  },
  props: ["title", "buttons"],
  methods: {
    ...mapActions(["updateChatList", "updateChatView"]),
    //service
    fetchChatList: async function () {
      this.isLoading = true;
      let request = { ...chatAPI.getChatList };
      let res = await service(request);
      this.isLoading = false;
      this.updateChatList(res.data);
    },
    getFriendNameOrNumber: function (participant) {
      let mobileNo = participant.find(
        (data) => this.getProfile.mobileNumber !== data
      );
      let friendDetail = this.getChatList.friendsList.find(
        (data) => data.mobileNumber !== mobileNo
      );
      if (friendDetail) return friendDetail.name;
      return mobileNo;
    },
  },
};
</script>