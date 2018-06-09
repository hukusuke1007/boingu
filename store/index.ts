import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { profile } from './profile/index'
import { luis } from './luis/index'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store<RootState>({
    state: {
      version: '1.0.0' // a simple property
    },
    modules: {
      profile,
      luis
    }    
  })
}
export default createStore
/*
const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0' // a simple property
    },
    modules: {
        profile
    }
}

export default new Vuex.Store<RootState>(store)
*/