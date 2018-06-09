import { GetterTree } from 'vuex'
import { FirebaseState, User } from './types'
import { RootState } from '../types'

export const getters: GetterTree<FirebaseState, RootState> = {
    user(state): User {
        return state.user
    }
}