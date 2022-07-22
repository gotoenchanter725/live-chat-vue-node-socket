import Vue from 'vue'
import Vuex from 'vuex'
import profile from './profile'
import friends from './friends'
import socket from './socket'
import chats from './chats'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules : {
		profile,
		friends,
		socket,
		chats
	}
})

export default store