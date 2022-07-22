<template>
    <div class="auth-wrapper">
        <div class="card">
            <div class="card-brand">
                <b-icon-chat-square-dots></b-icon-chat-square-dots>
            </div>
            <h4 class="mb-5 font-weight-bold text-uppercase">Login</h4>
            <form class="form">
                <div class="form-group">
                    <input type="text" name="Username" v-model="mobileNumber" class="form-control" placeholder="Mobile number" />
                </div>
                <div class="form-group">
                    <input name="password" type="password" v-model="password" class="form-control" placeholder="Password" />
                </div>
                <div class="form-submit mt-4">
                    <button class="btn btn-success w-100 py-2" v-on:click="greet">
                        Login
                    </button>
                    <p class="mt-3">Don't have account, click
                        <router-link to="/register">here</router-link>
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
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            mobileNumber: null,
            password: null
        }
    },
    methods: {
        ...mapActions([
            'getProfileDetail'
        ]),

        greet: async function(e) {
            e.preventDefault();

            let data = {
                ...this.$data
            }

            let request = { ...authAPI.login, data }

            let res = await service(request)

            if (res.status === 200) {
                localStorage.setItem('token', res.data.token)
                this.getProfileDetail(res.data)
                this.$router.push('/dashboard')
            }
            Vue.notify({
                group: 'foo',
                type: res.status === 200 ? 'success' : 'error',
                text: res.message
            });
        }
    }
}
</script>