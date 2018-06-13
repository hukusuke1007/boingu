<template>
    <v-flex xs12 sm6 offset-sm3>
      <TopLogin/>
    </v-flex>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator'
import { State, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'
import TopLogin from "~/components/TopLogin.vue"

const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
    TopLogin
  },
  watch: {
    user (newVal, oldVal) {
      console.log('index watch', newVal, oldVal)
      if (newVal !== undefined) {
        this.$router.push( {name: 'dashboard'} )
      }
    }
  }
})
export default class index extends Vue {
  // ■ Vuex
  @FirebaseModule.State user

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