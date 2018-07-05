<template>
    <v-card>
        <v-container fluid grid-list-md class="schedule">
        <v-layout row wrap>
            <div class="card-flex" v-for="(item, index) in bestDayList" :key="index">
              <ScheduleCard v-bind:bestDay="item"/>
            </div>
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
import ScheduleCard from "~/components/cards/ScheduleCard.vue"
import BestDay from '~/modules/model/firebase/firebaseBestDayModel'
import firebaseController from '~/modules/controller/firebaseController'
const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
    ScheduleCard
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
  bestDayList: Array<BestDay> = []
  
  // ■ Method.
  created () {
    console.log('created before DOM')
  }
  mounted () {
    console.log('mounted after DOM')
    this.getBestDaylist()
  }

  async getBestDaylist () {
    let controller = new firebaseController()
    let docs = await controller.getBestDayList()
    docs.forEach((doc) => {
      console.log('sub', doc.id, doc.data())
      let bestDay = new BestDay(doc.data().user, doc.data().createDate, doc.data().updateDate, doc.id)
      bestDay.imageUrl = doc.data().imageUrl
      bestDay.isDelete = doc.data().isDelete
      bestDay.contents = doc.data().contents
      this.bestDayList.push(bestDay)
    })
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