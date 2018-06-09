import { MutationTree } from 'vuex'
import { LuisState } from './types'

export const mutations: MutationTree<LuisState> = {
    setLoading(state, payload: boolean) {
        state.isLoading = payload
    },
    setLearningData(state, payload: string) {
        state.error = false
        state.result = payload
    },
    setError(state) {
        state.error = true
        state.result = undefined
    }
}