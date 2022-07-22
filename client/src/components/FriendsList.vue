<template>
    <div class="chat-list-container row no-gutters flex-column d-none d-lg-block">
        <header class="d-flex align-items-center header justify-content-between col-auto">
            <h5>Friends</h5>
            <div>
                <button class="btn btn-primary btn-sm" v-on:click="showAddAndEditFriendModel()">
                    Add New Friend
                </button>
            </div>
        </header>
        <div class="chat-search py-4 col-auto">
            <input type="text" class="form-control" placeholder="Search Chat" />
        </div>
        <div class="col overflowY-scroll">
            <div class="chats ">
                <div class="text-center py-4" v-if="isLoading">
                    <div class="spinner-border text-center" ></div>
                </div>
                <div class="chat" v-else v-for="friend in getFriend" v-bind:key="friend.name">
                    <img src="http://soho.laborasyon.com/default/dist/media/img/man_avatar1.jpg" />
                    <div class="detail">
                        <h6>{{friend.name}}</h6>
                        <p class="small">{{friend.mobileNumber}}</p>
                    </div>
                    <div class="px-3 text-primary cursor-pointer align-self-start custom-dropdown">
                        <b-dropdown id="dropdown-1" variant="link" no-caret>
                            <template v-slot:button-content>
                                <b-icon-three-dots></b-icon-three-dots>
                            </template>
                            <b-dropdown-item v-on:click="chatWithFriend(friend)">Chat</b-dropdown-item>
                            <b-dropdown-item v-on:click="showAddAndEditFriendModel(friend)">Edit</b-dropdown-item>
                            <b-dropdown-item v-on:click="showDeleteFriendModel(friend)">Delete</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import { userAPI } from '@/services/apiVariables'
import service from '@/services'

export default {
    data(){
        return {
            isLoading : false
        }
    },
    computed: {
        ...mapGetters([
            'getFriend',
            'getSocket',
            'getProfile'
        ])
    },
    mounted(){
        this.fetchFriendList()
    },
    props: ['title', 'buttons'],
    methods: {
        ...mapActions([
            'getFriendList',
            'updateChatView'
        ]),
        showAddAndEditFriendModel: function(data) {
            this.$emit('showAddAndEditFriendModel', data)
        },
        showDeleteFriendModel: function(data) {
            this.$emit('showDeleteFriendModel', data)
        },
        //service
        fetchFriendList : async function(){
            this.isLoading=true
            let request = { ...userAPI.getFriendList }
            let res = await service(request)
            if(res.status === 200)
                this.getFriendList(res.data)
            this.isLoading=false
        },
        chatWithFriend: async function(chat){
            console.log(chat)
            let data = {
                rooms : chat.room,
                room : chat.room._id,
                chats : []
            }
            this.updateChatView(data)
        }
    }
}
</script>