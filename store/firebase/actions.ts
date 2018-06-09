import { ActionTree } from 'vuex'
import { FirebaseState } from './types'
import { RootState } from '../types'
import { firestore } from 'firebase/app'

export const actions: ActionTree<FirebaseState, RootState> = {
    // ログイン
    doLogin({ commit, getters}, type: string) {
    },
    // テスト用
    doSet({ commit }, payload: string) {
        commit('setLoad', true)
        let db = firestore()
        db.collection('ababa').add({
          first: payload,
          last: 'Lovelance',
          born: 1815
        }).then((docRef) => {
          console.log(docRef)
          commit('setLoad', false)
        }).catch((error) => {
          console.error(error)
          commit('setLoad', false)
        })
    }
}