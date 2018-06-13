<template>
  <section>
  <div>
      <v-flex>
        <v-btn color="testColor" class="white--text" @click="tapBtn()">クリック</v-btn>
      </v-flex>
  </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator'
import { State, Getter, Action, namespace } from 'vuex-class'
import * as firebase from '~/store/firebase'
import nextPage from './nextPage.vue'
// import Card from "~/components/Card.vue"

@Component({
  components: {
//    Card
  },
  watch: {
    isLoadFirebase (newVal: boolean, oldVal: boolean) {
      console.log('isLoadFirebase', newVal, oldVal)
    }
  }
})
export default class index extends Vue {

  // ■ Method.
  created () {
    console.log('created before DOM')
  }
  mounted () {
    console.log('mounted after DOM')
  }
  tapBtn () {
    console.log('tap')
    // this.$router.push( {name: 'testNextPage'} )
    // this.$router.push( {name: 'testNextPage', params: {id: 1, message: 'message'}} )
  }
}
</script>
<style scoped>
</style>