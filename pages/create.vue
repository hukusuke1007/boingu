<template>
    <v-flex>
      <div class="body">
        <CreateBestDay />
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
import CreateBestDay from '~/components/containers/CreateBestDay.vue'

const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
    CreateBestDay
  },
  watch: {
    isLoadFirebase (newVal: boolean, oldVal: boolean) {
      console.log('isLoadFirebase', newVal, oldVal)
    }
  }
})
export default class create extends Vue {
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