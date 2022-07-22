<template>
    <b-modal :id="id">
        <template v-slot:modal-title>
            <h5 class="font-weight-bold">Delete Friend</h5>
        </template>
        <div class="p-3">
            <h6>
                Are you sure you wanna delete <strong class="text-uppercase">{{name}}</strong>
            </h6>
        </div>
        <template v-slot:modal-footer>
            <div class="d-flex align-items-center">
                <b-button variant="danger" v-on:click="deleteFriend" class="mr-3 btn-pad-md" size="md">
                    Delete
                </b-button>
                <b-button variant="secondary" size="md btn-pad-md" v-on:click="closeModel">
                    Cancel
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
import { userAPI } from '@/services/apiVariables'
import service from '@/services'
import Vue from 'vue'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            name: null,
            mobileNumber: null
        }
    },
    name: 'DeleteFriendModel',
    props: ['selectedData','id'],
    methods: {
        ...mapActions([
            'getFriendList'
        ]),
        closeModel: function() {
            this.$emit('closeModel')
        },
        // services
        deleteFriend: async function(){
            let request = { ...userAPI.deleteFriend }
            request.url = request.url.replace(':id', this._id)
            request.data = this.$data
            let res = await service(request)
            if (res.status === 200){
                this.getFriendList(res.data) 
                this.closeModel()
            }
            Vue.notify({
                group: 'foo',
                type: res.status === 200 ? 'success' : 'error',
                text: res.message
            });
            this.isLoading = false
        }
    },
    watch: {
        selectedData: function() {
            let data = Object.assign({}, this.selectedData)
            if (data) {
                this.name = data.name
                this.mobileNumber = data.mobileNumber
                this._id = data._id
            }
        }
    }
}
</script>