import { MutationTree } from 'vuex'
import { FirebaseState } from './types'
import User from '~/modules/model/firebase/firebaseUserModel'

export const mutations: MutationTree<FirebaseState> = {
    setUser(state, payload: User) {
        state.user = payload
        console.log('setUser', state.user)
    },
    setLoad(state, payload: boolean) {
        state.isLoad = payload
    },
    setError(state) {
        state.isError = true
        state.user = undefined
    }
}