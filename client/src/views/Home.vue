<template>
    <div>
        <h1 class="loader" v-if="loading">
            <div class="spinner-grow" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </h1>
        <div class="container-fluid p-0" v-else>
            <AddAndEditModel :id="addAndEditModelId" :view="isAddView" :selectedData="selectedData" @closeModel="closeAddAndEditFriendModel" />
            <DeleteFriendModel :id="deleteFriendModelId" :selectedData="selectedData" @closeModel="closeDeleteModel" />
            <b-navbar variant="white" type="light">
                <b-navbar-brand tag="h1" class="mb-0 font-weight-bold">MyChat</b-navbar-brand>
                <div class="profile ml-auto text-secondary h6 mb-0">
                    <b-icon-person-fill></b-icon-person-fill>
                    {{getProfile&&getProfile.userName}}
                    <br>
                    <small>{{getProfile&&getProfile.mobileNumber}}</small>
                </div>
            </b-navbar>
            <div class="row no-gutters">
                <div class="col-auto">
                    <Sidebar :sidebarView="sidebarView" @toggleSidebarView="toggleSidebarView" />
                </div>
                <div class="col-auto">
                    <div class="chat-list-group">
                        <ChatList title="Chats" v-if="sidebarView === 'chats'" />
                        <FriendsList v-else title="Friends" @showAddAndEditFriendModel="showAddAndEditFriendModel" @showDeleteFriendModel="showDeleteFriendModel" />
                    </div>
                </div>
                <div class="col">
                    <ChatBox />
                </div>
                <div>
                    <!-- <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button> -->
                    <b-sidebar id="sidebar-1" title="Sidebar" right shadow>
                        <div class="px-3 py-2">
                            <p>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            </p>
                            <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
                        </div>
                    </b-sidebar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Vue from 'vue'
import service from '@/services'
import { authAPI } from '@/services/apiVariables.js'
import Sidebar from '@/components/Sidebar.vue'
import ChatBox from '@/components/ChatBox.vue'
import ChatList from '@/components/ChatList.vue'
import AddAndEditModel from '@/components/AddAndEditFriendModel'
import FriendsList from '@/components/FriendsList.vue'
import DeleteFriendModel from '@/components/DeleteFriendModel.vue'
import { mapGetters,mapActions } from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
            loading: false,
            userDetails: null,
            showChatView: false,
            isAddView: false,
            selectedData: {
                name: 'Hellow',
                mobileNumber: 'Data'
            },
            addAndEditModelId: 'addAndEditModel',
            deleteFriendModelId: 'deleteFriendModel',
            sidebarView: 'chats'
        }
    },
    mounted() {
        if (!this.getProfile)
            this.authorize()
    },
    computed: {
        ...mapGetters([
            'getProfile',
            'getSocket'
        ])
    },
    methods: {
        ...mapActions([
            'getProfileDetail'
        ]),
        //SERVICE START
        authorize: async function() {
            console.log(this.getSocket)
            this.loading = true
            let request = { ...authAPI.verifyToken }
            let res = await service(request)
            this.loading = false

            if (res.status === 200) {
                this.getProfileDetail(res.data)
            } else {
                this.$router.push('/')
            }
        },
        //SERVICE END
        toggleSidebarView: function(view) {
            this.sidebarView = view
        },
        closeModel: function(id) {
            this.$bvModal.hide(id)
        },
        showModel: function(id) {
            this.$bvModal.show(id)
        },
        showAddAndEditFriendModel: function(data) {
            if (data) {
                this.isAddView = false
                this.selectedData = Object.assign({}, data)
            } else {
                this.isAddView = true
                this.selectedData = {}
            }
            this.showModel(this.addAndEditModelId)
        },
        closeAddAndEditFriendModel: function() {
            this.closeModel(this.addAndEditModelId)
        },
        showDeleteFriendModel: function(data) {
            this.selectedData = Object.assign({}, data)
            this.showModel(this.deleteFriendModelId)
        },
        closeDeleteModel: function() {
            this.closeModel(this.deleteFriendModelId)
        }
    },
    components: {
        Sidebar,
        ChatBox,
        ChatList,
        FriendsList,
        AddAndEditModel,
        DeleteFriendModel
    },
    watch: {
        selectedData: function() {
            console.log(this.selectedData)
        }
    }
}
</script>