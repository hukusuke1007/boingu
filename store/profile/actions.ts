import { ActionTree } from 'vuex'
import { ProfileState, User } from './types'
import { RootState } from '../types'
import { userA } from './userA'

export const actions: ActionTree<ProfileState, RootState> = {
    fetchData({ commit }): any {
        let user: userA = new userA()
        const payload: User = user
        commit('profileLoaded', payload)
    }
}