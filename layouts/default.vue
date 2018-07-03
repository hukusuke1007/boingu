<template>
  <div id="app">
     <!-- ヘッダー -->
     <v-toolbar
      dark
      color="main-boingu"
      fixed
      app
     >
    <!-- 左 -->
    <v-menu bottom offset-y v-if="user.iconUrl!==''">
         <v-btn slot="activator" icon>
           <v-avatar><img :src="user.iconUrl"/></v-avatar>
         </v-btn>
         <AccountMenu />
    </v-menu>
     <v-toolbar-title class="white-boingu"></v-toolbar-title>
     <v-spacer></v-spacer>
     <!-- 右 -->
     <v-toolbar-side-icon @click="tap()">
       <v-icon>search</v-icon>
     </v-toolbar-side-icon>
     <v-toolbar-side-icon>
       <!-- <router-link :to="{ name: 'dashboard', params: { kind: 'show_only' } }" class="routerLink"> -->
       <router-link to="/dashboard" class="routerLink">
        <v-icon>receipt</v-icon>
       </router-link>
    </v-toolbar-side-icon>
     </v-toolbar>
     <v-app>
      <!-- コンテンツ -->
      <v-content>
        <v-fade-transition mode="out-in">
          <nuxt/>
        </v-fade-transition>
      </v-content>

      <!-- フッター -->
      <v-footer height="auto" class="blue-boingu">
        <v-layout row wrap justify-center>
          <!--
          <v-btn
            color="white"
            flat
            v-for="link in links"
            :key="link"
            @click="tapFooter(link)"
          >
            {{ link }}
          </v-btn>
          -->
          <v-flex xs12 py-3 text-xs-center class="grey-boingu">
            &copy;2018. <strong>ぼいんぐ Boingu</strong>
          </v-flex>
        </v-layout>
      </v-footer>
     </v-app>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator'
import { State, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'
import AccountMenu from '~/components/menu/AccountMenu.vue'

const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
    AccountMenu
  },
  watch: {
    isLoadFirebase (newVal: boolean, oldVal: boolean) {
      console.log('isLoadFirebase', newVal, oldVal)
    },
    user (newVal, oldVal) {
      console.log('default watch', newVal, oldVal)
      /*
      if (newVal === undefined) {
        this.$router.push( {name: 'index'} )
      } else {
        this.$router.push( {name: 'dashboard'} )
      }
      */
    }
  }
})
export default class extends Vue {
  @FirebaseModule.State isLoadFirebase
  @FirebaseModule.State user
  @FirebaseModule.Action doMyAccount
  created () {
    this.doMyAccount()
  }
  tap() {
    console.log('tap')
  }
}
</script>

<style>
#app {
  font-family: 'Open Sans', 'Hiragino Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #FAFAFB;
}

.routerLink {
  color: #FAFAFB;
  font-weight: bold;
  text-decoration: none;
}

 </style>
 
