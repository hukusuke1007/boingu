<template>
  <div id="app">
     <!-- ヘッダー -->
     <v-toolbar
      dark
      color="main-boingu"
      fixed
      app
     >
     <v-toolbar-title class="white-boingu"></v-toolbar-title>
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
            &copy;2018. <strong>Shohei Nakagawa</strong>
          </v-flex>
        </v-layout>
      </v-footer>
     </v-app>
  </div>
</template>

<style>
#app {
  font-family: 'Hiragino Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #FAFAFB;
}
 </style>
 
