import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'
import { firebase } from './firebase/index'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store<RootState>({
    state: {
      version: '1.0.0' // a simple property
    },
    modules: {
      firebase
    }    
  })
}
export default createStore