import { GetterTree } from 'vuex'
import { LuisState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<LuisState, RootState> = {
    learningResult(state): string {
        return state.result
    },
    isLoading(state): boolean {
        return state.isLoading
    }
}