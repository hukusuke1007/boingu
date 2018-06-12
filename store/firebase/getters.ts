import { GetterTree } from 'vuex'
import { FirebaseState } from './types'
import { RootState } from '../types'
import User from '~/modules/model/firebase/firebaseUserModel'

export const getters: GetterTree<FirebaseState, RootState> = {
    user(state): User {
        return state.user
    }
}