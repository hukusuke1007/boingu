<template>
    <v-card class="card-action">
        <v-card-media :src="src" height="200px">
            <v-flex xs12 align-end flexbox>
                <span class="headline white--text" v-text="title"></span>
            </v-flex>
        </v-card-media>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon><v-icon>favorite</v-icon></v-btn>
            <v-btn icon><v-icon>bookmark</v-icon></v-btn>
            <v-btn icon><v-icon>share</v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"
import { State, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'
import User from '~/modules/model/firebase/firebaseUserModel'


@Component({
  components: {
  },
  watch: {
  }
})
export default class TopScheduleCards extends Vue {
  // @Prop()
  // @FirebaseModule.State user:User
  src: string = ''
  title: string = 'Pre-fab homes'

  created () {
  }
  mounted () {
      this.src = 'https://s3.amazonaws.com/vuetify-docs/images/cards/road.jpg'
      console.log('src', this.src)
  }
}
</script>
<style scoped lang="scss">
.card-action {
    background-color: rgba($color: #D3D3D3, $alpha: 0.5);
    color: black;
}

</style>
