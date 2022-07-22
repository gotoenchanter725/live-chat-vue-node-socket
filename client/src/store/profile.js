import { profileType } from './actionTypes'

let { GET_PROFILE_DETAIL } = profileType

export default {
    state : () => ({
        user :null
    }),
    mutations : {
        [GET_PROFILE_DETAIL](state,payload){
            state.user=payload
        }
    },
    actions : {
        getProfileDetail({ commit },profile){
            commit(GET_PROFILE_DETAIL,profile)
        }
    },
    getters : {
        getProfile(state){
            return state.user
        }
    }
}