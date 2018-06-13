<template>
  <v-flex class="body">
    <span v-for="(item, key, index) in tryList" :key="index">
      <a href="#" class="btn" @click="tryRegist(item)" v-bind:class="item.color">{{ item.content }}</a>
    </span>
      <a href="#" class="btn red" @click="tryCreate()">+</a>
  </v-flex>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"
import { State, Action, namespace } from 'vuex-class'
import * as firebaseStore from '~/store/firebase'
import Try from '~/modules/model/firebase/firebaseTryModel'
const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
  },
  watch: {
    tryList (newVal:Array<Try>, oldVal:Array<Try>) {
      console.log('tryList', newVal, oldVal)
    }
  }
})
export default class CreateBestDay extends Vue {
  // @Prop()
  @FirebaseModule.State tryList:Array<Try>

  title: string = 'Boingu'

  created () {
    if (this.tryList !== undefined) {
    }
  }
  mounted () {
  }
  tryRegist (item:Try) {
    console.log(item.content)
  }
  tryCreate (){

  }
}
</script>
<style scoped>

.body {
  font-family: 'Open Sans', 'sans-serif';
  background-color: #fff;
}

.btn {
  border-radius: 5px;
  padding: 12px 25px;
  font-size: 22px;
  text-decoration: none;
  text-transform: none;
  margin: 20px;
  color: #fff;
  position: relative;
  display: inline-block;
  height: 52px;
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 1px 0px 0px;
}

.blue {
  background-color: #55acee;
  box-shadow: 0px 5px 0px 0px #3C93D5;
}

.blue:hover {
  background-color: #6FC6FF;
}

.green {
  background-color: #2ecc71;
  box-shadow: 0px 5px 0px 0px #15B358;
}

.green:hover {
  background-color: #48E68B;
}

.red {
  background-color: #e74c3c;
  box-shadow: 0px 5px 0px 0px #CE3323;
}

.red:hover {
  background-color: #FF6656;
}

.purple {
  background-color: #9b59b6;
  box-shadow: 0px 5px 0px 0px #82409D;
}

.purple:hover {
  background-color: #B573D0;
}

.orange {
  background-color: #e67e22;
  box-shadow: 0px 5px 0px 0px #CD6509;
}

.orange:hover {
  background-color: #FF983C;
}

</style>
