<template>
    <v-flex xs12 sm6 offset-sm3>
      ダッシュボード
    </v-flex>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator'
import { State, Getter, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'

const FirebaseState = namespace(firebaseStore.name, State)
const FirebaseAction = namespace(firebaseStore.name, Action)
const FirebaseGetter = namespace(firebaseStore.name, Getter)

@Component({
  components: {
  },
  watch: {
    isLoadFirebase (newVal: boolean, oldVal: boolean) {
      console.log('isLoadFirebase', newVal, oldVal)
    }
  }
})
export default class index extends Vue {
  // ■ Vuex
  @FirebaseState('isLoad') isLoadFirebase
  // @FirebaseGetter isLoad

  // ■ Method.
  created () {
    console.log('created before DOM')
  }
  mounted () {
    console.log('mounted after DOM')
  }
}
</script>
<style scoped>
</style>