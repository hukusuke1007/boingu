import { ActionTree } from 'vuex'
import { FirebaseState } from './types'
import { RootState } from '../types'
import { firestore } from 'firebase/app'
import { firebaseWrapper } from '~/modules/wrapper/firebaseWrapper'
import User from '~/modules/model/firebase/firebaseUserModel'

let frWrapper = new firebaseWrapper()

export const actions: ActionTree<FirebaseState, RootState> = {

    // ■ アカウント取得.
    doGetMyAccount({ commit }) {
      frWrapper.getMyAccount()
       .then((user) => {
         // console.log('getMyAccount', user)
         if (user !== null) {
          commit('setUser', user)
         }
      }).catch((error) => {
        console.error('getMyAccount', error)
      })
    },

    // ■ ログイン
    doLogin({ commit, getters}, type: string) {
      // console.log('doLogin', type)
      commit('setLoad', true)
      // ログイン.
      frWrapper.login(type)
        .then((result) => {
          let user = getters.user
          if (getters.user === undefined) {
            console.log('getters.user', getters.user)
            user = result
          }
          // アカウント作成.
          frWrapper.createUser(user)
            .then((userDoc) => {
              user = userDoc
              commit('setUser', user)
              commit('setLoad', false)
            }).catch((error) => {
              console.error('createUser', error)
              commit('setLoad', false)
            })
        }).catch((error) => {
          console.error('login', error)
          commit('setLoad', false)
        })
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