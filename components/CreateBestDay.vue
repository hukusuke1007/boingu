<template>
  <div>
   CreateBestDay
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"
import { State, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'

const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
  },
  watch: {
  }
})
export default class CreateBestDay extends Vue {
  // @Prop()
  title: string = 'Boingu'
  created () {
  }
  mounted () {
  }
}
</script>
<style scoped>
.title-label {
  margin: 8px 0px 2px 0px;
  font-size: 3.0em;
}
.subtitle-label {
  font-size: 1.8em;
}
</style>
