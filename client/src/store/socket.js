import { socketIOType } from './actionTypes'
import io from 'socket.io-client';
let { CONFIGURE } = socketIOType

export default {
    state: () => ({
        socket: io('http://localhost:5000/')
    }),
    mutations: {
        [CONFIGURE](state, payload) {
            state.socket = payload
        }
    },
    actions: {
        getSocket({ commit }, socket) {
            commit(CONFIGURE, socket)
        }
    },
    getters: {
        getSocket(state) {
            return state.socket
        }
    }
}