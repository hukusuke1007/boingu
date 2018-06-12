<template>
  <div>
    <h1 class="title-label black-boingu">{{ title }}</h1>
    <div class="subtitle-label black-boingu">
      今日、がんばった自分を<br>褒めてもらおう！
    </div>
    <div style="margin-top: 8px;">
      <v-btn round large color="twitter white--text" @click="tapLogin('twitter')">Twitterでログイン</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"
import { State, Getter, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'

const FirebaseState = namespace(firebaseStore.name, State)
const FirebaseAction = namespace(firebaseStore.name, Action)

@Component({
  components: {
  },
  watch: {
  }
})
export default class TopLogin extends Vue {
  // @Prop()
  title: string = 'Boingu'
  
  @FirebaseState('user') user
  @FirebaseAction('doLogin') doLogin

  created () {
  }
  mounted () {
  }
  tapLogin (type: string) {
    console.log(type)
    this.doLogin(type)
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
