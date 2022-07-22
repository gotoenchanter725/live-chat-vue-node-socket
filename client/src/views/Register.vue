<template>
    <div class="auth-wrapper">
        <div class="card">
            <div class="card-brand">
                <b-icon-chat-square-dots></b-icon-chat-square-dots>
            </div>
            <h4 class="mb-5 font-weight-bold text-uppercase">Register</h4>
            <form class="form">
                <div class="form-group">
                    <input autocomplete="new-password" type="text" v-model="userName" class="form-control" placeholder="User name" />
                </div>
                <div class="form-group">
                    <input autocomplete="new-password" name="userName" type="number" v-model="mobileNumber" class="form-control" placeholder="Mobile number" />
                </div>
                <div class="form-group">
                    <input autocomplete="new-password" name="password" type="text" v-model="password" class="form-control" placeholder="Password" />
                </div>
                <div class="form-submit mt-4">
                    <button class="btn btn-success w-100 py-2" v-on:click="register">
                        Register
                    </button>
                    <p class="mt-3">Already have an account, click
                        <router-link to="/">here</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import service from '@/services'
import { authAPI } from '@/services/apiVariables.js'

export default {
    data() {
        return {
            mobileNumber: null,
            password: null
        }
    },
    methods: {
        register: async function(e) {
            e.preventDefault();

            let data = {
                mobileNumber: this.mobileNumber,
                password: this.password,
                userName: this.userName
            }

            let request = { ...authAPI.register, data }

            let res = await service(request)

            if (res.status === 201)
                this.$router.push('/')

            Vue.notify({
                group: 'foo',
                type: res.status === 201 ? "success" : "error",
                text: res.message
            });
        }
    }
}
</script>