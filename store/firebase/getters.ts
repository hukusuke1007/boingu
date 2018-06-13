import { GetterTree } from 'vuex'
import { FirebaseState } from './types'
import { RootState } from '../types'
import User from '~/modules/model/firebase/firebaseUserModel'
import Try from '~/modules/model/firebase/firebaseTryModel'

export const getters: GetterTree<FirebaseState, RootState> = {
    user(state): User {
        return state.user
    }
}