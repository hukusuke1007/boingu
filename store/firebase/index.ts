import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { FirebaseState } from './types'
import { RootState } from '../types'

export const state: FirebaseState = {
    user: undefined,
    isLoad: false,
    isError: false
}

const namespaced: boolean = true

export const name = 'firebase'
export const firebase: Module<FirebaseState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}