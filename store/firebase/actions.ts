import { ActionTree } from 'vuex'
import { FirebaseState } from './types'
import { RootState } from '../types'
import { firestore } from 'firebase/app'
import { firebaseWrapper } from '~/modules/wrapper/firebaseWrapper'
import { myUser } from '~/modules/model/myUser'
let wrapper = new firebaseWrapper()

export const actions: ActionTree<FirebaseState, RootState> = {
    // ログイン
    doLogin({ commit, getters}, type: string) {
      console.log('doLogin', type)
      commit('setLoad', true)
      wrapper.login(type)
       .then((result) => {
         commit('setLoad', false)
         let user = new myUser()
         if (getters.user !== undefined) {
           console.log('getters.user', getters.user)
           user = getters.user
         }
         user.uid = result.user.uid
         user.id = result.additionalUserInfo.username
         user.email = result.user.email
         user.name = result.user.displayName
         console.log('user', user)
         commit('setUser', user)
       }).catch((error) => {
         console.error('user', error)
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