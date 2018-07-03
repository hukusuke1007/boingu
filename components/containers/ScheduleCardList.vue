<template>
    <v-card>
        <v-container fluid grid-list-md class="schedule">
        <v-layout row wrap>
            <div class="card-flex"><TopScheduleCard/></div>
            <div class="card-flex"><TopScheduleCard/></div>
            <div class="card-flex"><TopScheduleCard/></div>
            <div class="card-flex"><TopScheduleCard/></div>
        </v-layout>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator'
import { State, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'
import TopScheduleCard from "~/components/cards/TopScheduleCard.vue"

const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
    TopScheduleCard
  },
  watch: {
    user (newVal, oldVal) {
      console.log('index watch', newVal, oldVal)
      /*
      if (newVal !== undefined) {
        this.$router.push( {name: 'dashboard'} )
      }
      */
    }
  }
})
export default class ScheduleCardList extends Vue {
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
<style scoped lang="scss">

.schedule {
  background-color: white;
}

.card-flex {
  margin: auto;
  // margin-left: 2px;
  width: 260px;
  height: 220px;
}

</style>