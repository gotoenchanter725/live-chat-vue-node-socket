import { chatType } from './actionTypes'

let { UPDATE_CHAT, GET_CHAT_LIST, UPDATE_CHAT_VIEW } = chatType

export default {
    state: () => ({
        chats: {
            chatList: [],
            friendsList: []
        },
        selectedChatView: null
    }),
    mutations: {
        [GET_CHAT_LIST](state, payload) {
            state.chats = payload
        },
        [UPDATE_CHAT_VIEW](state, payload) {
            state.selectedChatView = payload
        },
        [UPDATE_CHAT](state, payload) {
            state.selectedChatView.chats = [...state.selectedChatView.chats, payload]
        }
    },
    actions: {
        updateChatList({ commit }, chats) {
            commit(GET_CHAT_LIST, chats)
        },
        updateChatView({ commit }, view) {
            commit(UPDATE_CHAT_VIEW, view)
        },
        UpdateChat({ commit }, chat) {
            console.log({ commit }, chat)
            commit(UPDATE_CHAT, chat)
        }
    },
    getters: {
        getChatList(state) {
            return state.chats
        },
        getChatView(state) {
            return state.selectedChatView
        }
    }
}