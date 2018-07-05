<template>
    <v-card class="card-action" v-if="bestDay!==null">
        <v-card-media :src="src" height="160px">
            <v-flex xs12 align-end flexbox>
                <span class="headline white--text" v-text="bestDay.uid"></span>
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
import BestDay from '~/modules/model/firebase/firebaseBestDayModel'


@Component({
  components: {
  },
  props: {
      bestDay: {
          type: BestDay,
          default: null
      }
  },
  watch: {
      'bestDay.uid' (newVal, oldVal) {
          console.log('newVal', newVal)
          if (newVal !== '') {
              this.src = this.newVal.imageUrl
          }
      }
  }
})
export default class TopScheduleCards extends Vue {
  // @Prop()
  // @FirebaseModule.State user:User
  src: string = 'https://s3.amazonaws.com/vuetify-docs/images/cards/road.jpg'
  title: string = 'Pre-fab homes'

  created () {
  }
  mounted () {
      console.log('bestDay', this.$props.bestDay)
      if (this.$props.bestDay.imageUrl !== '') {
          this.src = this.$props.bestDay.imageUrl
      }
  }
}
</script>
<style scoped lang="scss">
.card-action {
    background-color: rgba($color: #D3D3D3, $alpha: 0.5);
    color: black;
}

</style>
