import { ActionTree } from 'vuex'
import { LuisState } from './types'
import { RootState } from '../types'
import { luisWrapper } from '~/modules/wrapper/luis'

const luis = new luisWrapper()

export const actions: ActionTree<LuisState, RootState> = {
    doLearningText({ commit }, payload: string) {
        commit('setLoading', true)
        // let luis = new luisWrapper()
        luis.getAnswer(payload)
            .then((result) => {
                commit('setLearningData', result)
                commit('setLoading', false)
            }).catch((error) => {
                console.error('error', error)
                commit('setLoading', false)
            })
    }
}