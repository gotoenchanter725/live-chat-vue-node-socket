import { friendsType } from './actionTypes'
let { GET_FRIENDS } = friendsType

export default {
    state : () => ({
        isLoading : false,
        friends : []
    }),
    mutations : {
        [GET_FRIENDS](state,payload){
            state.friends=payload
        }
    },
    actions : {
        getFriendList({ commit },friends){
            commit(GET_FRIENDS,friends)
        }
    },
    getters : {
        getFriend(state){
            return state.friends
        }
    }
}