import { ActionTree } from 'vuex'
import { FirebaseState } from './types'
import { RootState } from '../types'
import { firestore } from 'firebase/app'
import { firebaseWrapper } from '~/modules/wrapper/firebaseWrapper'
import Try from '~/modules/model/firebase/firebaseTryModel'
import utility from '~/modules/utils/utility'

let frWrapper = new firebaseWrapper()

export const actions: ActionTree<FirebaseState, RootState> = {

    // ■ アカウント取得.
    doMyAccount({ commit, dispatch }) {
      frWrapper.getMyAccount()
       .then((user) => {
         // console.log('getMyAccount', user)
         if (user !== null) {
          commit('setUser', user)
         }
         dispatch('doTryList') // try情報も取得する.
      }).catch((error) => {
        console.error('getMyAccount', error)
      })
    },

    // ■ Try情報を取得.
    doTryList({ commit }) {
      let tryList:Array<Try> = new utility().getTryDefaultList()
      // firebaseから取得する.
      // 〜〜　取得 〜〜　
      commit('setTryList', tryList)
    },

    // ■ ログイン
    doLogin({ commit, dispatch, getters}, type: string) {
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

          // try情報も取得する.
          dispatch('doTryList')

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