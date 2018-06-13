import { MutationTree } from 'vuex'
import { FirebaseState } from './types'
import User from '~/modules/model/firebase/firebaseUserModel'
import Try from '~/modules/model/firebase/firebaseTryModel'

export const mutations: MutationTree<FirebaseState> = {
    setUser(state, payload: User) {
        state.user = payload
        // console.log('setUser', state.user)
    },
    setTryList(state, payload: Array<Try>) {
        state.tryList = payload
        // console.log('setTryList', state.tryList)
    },
    setLoad(state, payload: boolean) {
        state.isLoad = payload
    },
    setError(state) {
        state.isError = true
        state.user = undefined
    }
}