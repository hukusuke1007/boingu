<template>
    <v-flex>
      <div class="body">
        <Account />
      </div>
    </v-flex>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator'
import { State, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'
import Account from '~/components/containers/Account.vue'

const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
    Account
  },
  watch: {
    isLoadFirebase (newVal: boolean, oldVal: boolean) {
      console.log('isLoadFirebase', newVal, oldVal)
    }
  }
})
export default class account extends Vue {
  // ■ Vuex
  @FirebaseModule.State('isLoad') isLoadFirebase
  // @FirebaseState('isLoad') isLoadFirebase

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
.body {
  margin: 8px 0px 8px 0px;
}
</style>