<template>
  <v-layout row>
   <v-card>
      <v-list subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-if="user.displayName!==''"><b>{{ user.displayName }}</b></v-list-tile-title>
            <v-list-tile-title v-else>ログインしてください</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-list-tile v-for="item in items" :key="item.title" avatar @click="tapItem(item)">
          <v-icon v-if="item.action!==null">{{ item.action }}</v-icon>
          <div v-else><img :src="item.img" class="iconSize" /></div>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-list-tile @click="tapLogout()">
          <v-list-tile-content>
            <v-list-tile-title>ログアウト</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
   </v-card>
 </v-layout>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"
import { State, Getter, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'

const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
  },
  watch: {
  }
})
export default class AccountMenu extends Vue {
  // @Prop()
  @FirebaseModule.State user
  items: Array<any> = [
    {
      action: 'person_outline',
      title: 'マイページ',
      type: 'routerLink',
      url: 'dashboard'
    }
  ]

  created () {
  }
  mounted () {
  }
  tapItem(item:any) {
    if (item.type === 'routerLink') {
      this.$router.push(item.url)
    }
  }
  async tapLogout() {
    console.log('ログアウト')
    this.user.logout()
    this.$router.push('/')
  }
}
</script>
<style scoped>
.iconSize {
  height: 24px;
  widows: 24px;
}
</style>
