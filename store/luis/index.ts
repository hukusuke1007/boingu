import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { LuisState } from './types'
import { RootState } from '../types'

export const state: LuisState = {
    result: undefined,
    isLoading: false,
    error: false
}

const namespaced: boolean = true

export const name = 'luis'
export const luis: Module<LuisState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}