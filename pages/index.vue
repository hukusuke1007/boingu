<template>
  <section>
    <h1 class="header">AutoResponce</h1>
  <div>
      <v-flex>
        <v-btn color="testColor" class="white--text" @click="tapBtn()">クリック</v-btn>
      </v-flex>
      {{ fullName }}
  </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator'
import { State, Getter, Action, namespace } from 'vuex-class'
import * as profile from '~/store/profile'
import * as luis from '~/store/luis'
import nextPage from './nextPage.vue'
import {firestore} from 'firebase/app'
// import Card from "~/components/Card.vue"

const ProfileAction = namespace(profile.name, Action)
const ProfileGetter = namespace(profile.name, Getter)
const LuisAction = namespace(luis.name, Action)
const LuisGetter = namespace(luis.name, Getter)

@Component({
  components: {
//    Card
  },
  watch: {
    isLoading (newVal: boolean, oldVal: boolean) {
      console.log('isLoading', newVal, oldVal)
      if ((newVal === false) && (oldVal === true)) {
        // watchは変化がないと呼ばれないので常に変化があるloadingを監視してluisのメッセージを更新する.
        this.luis(this.learningResult)
      }
    },
    learningResult (newVal: string, oldVal: string) {
      // console.log('learningResult', newVal, oldVal)
    }
  }
})
export default class index extends Vue {
  // @State people

  // ■ Vuex
  @ProfileAction fetchData: any
  @ProfileGetter fullName: string

  @LuisAction doLearningText: any
  @LuisGetter learningResult: any
  @LuisGetter isLoading: boolean
  /*
  @Action('fetchData') fetchData: any
  @Getter('fullName') fullName: string

  @Action('doLearningText') doLearningText: any
  @Getter('learningResult') learningResult: any
  @Getter('isLoading') isLoading:boolean
  */

  // ■ Method.
  created () {
    console.log('created before DOM', process.env.FIREBASE_DB_URL)
  }
  mounted () {
    console.log('mounted after DOM')
    this.fetchData()
  }
  tapBtn () {
    console.log('tap')
    let db = firestore()
    db.collection('ababa').add({
      first: 'Ada',
      last: 'Lovelance',
      born: 1815
    }).then((docRef) => {
      console.log(docRef)
    }).catch((error) => {
      console.error(error)
    })
      /*
    db.collection('test').doc('LA').set({
        name: 'shohei',
        like: 'TRF',
        born: 1815
      }).then(() => {
        console.log('OK')
      }).catch((error) => {
        console.error(error)
      })
      */
    // this.$router.push( {name: 'nextPage'} )
    // this.$router.push( {name: 'nextPage', params: {id: 1, message: 'message'}} )
  }
}
</script>
<style scoped>
</style>