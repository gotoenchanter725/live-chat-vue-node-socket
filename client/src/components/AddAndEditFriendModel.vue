<template>
    <b-modal :id="id" centered>
        <template v-slot:modal-title>
            <h5 class="font-weight-bold">{{view ? "Add New Friend" : "Edit Friend"}}</h5>
        </template>
        <div class="p-3">
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" v-model="name" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="mobileNumber">Mobile Number</label>
                    <input type="number" class="form-control" v-model="mobileNumber" />
                </div>
            </form>
        </div>
        <template v-slot:modal-footer>
            <div class="d-flex align-items-center">
                <b-button variant="primary" class="mr-3 btn-pad-md" size="md" v-on:click="submit">
                    {{view ? "Add" : "Edit"}}
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
    name: 'AddAndEditFriendModel',
    props: ['view', 'selectedData', 'id'],
    methods: {
        ...mapActions([
            'getFriendList'
        ]),
        closeModel: function() {
            this.$emit('closeModel')
        },
        submit: function() {
            if (!Object.keys(this.selectedData).length)
                this.addFriend()
            else
                this.editFriend()
        },
        //service
        addFriend: async function() {
            let request = { ...userAPI.addNewFriend }
            request.data = this.$data
            let res = await service(request)
            if (res.status === 201) {
                this.getFriendList(res.data)
                this.closeModel()
            }
            console.log(res)
            Vue.notify({
                group: 'foo',
                type: res.status === 201 ? 'success' : 'error',
                text: res.message
            });
            this.isLoading = false
        },
        editFriend: async function() {
            let request = { ...userAPI.editFriend }
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