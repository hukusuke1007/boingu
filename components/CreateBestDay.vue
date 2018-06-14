<template>
<div class="buttonBody">
  <v-flex>
    <span v-for="(item, key, index) in tryList" :key="index">
      <a href="#" class="btn" @click="tryRegist(item)" v-bind:class="item.color">{{ item.content }}</a>
    </span>
      <a href="#" class="btn red" @click="tryCreate()">+</a>
  </v-flex>
  <v-flex class="tableBody">
    <div class="nowDate">
      {{ nowDateString }}
    </div>
    <table class="responstable">
      <tr>
        <th>時間</th><th>内容</th><th>コメント</th><th></th>
      </tr>
        <tr v-for="(item, key, index) in timeDataList" :key="index">
          <td data-th="時間">{{ item.time }}</td>
          <td data-th="内容">{{ item.content }}</td>
          <td data-th="コメント">{{ item.comment }}</td>
          <td data-th="削除"><a href="#" class="deleteBtn" @click="tapDelete(key)"><v-icon color="grey">delete</v-icon></a>
          </td>
        </tr>
    </table>
    <div class="descriptionBody" v-if="timeDataList.length===0">
      今日もお疲れ様でした！<br>今日の自分を記録してみませんか？
    </div>
  </v-flex>
  <v-flex class="timeChartBody">
    <TimeDataChart 
       v-bind:chartData="chartData"
       v-bind:options="chartOptions"
       v-bind:width="400"
       v-bind:height="200"
        />
  </v-flex>
</div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"
import { State, Action, namespace } from 'vuex-class'
import TimeDataChart from '~/components/TimeDataChart.vue'
import utility from '~/modules/utils/utility'

import * as firebaseStore from '~/store/firebase'
import User from '~/modules/model/firebase/firebaseUserModel'
import Try from '~/modules/model/firebase/firebaseTryModel'
import TimeData from '~/modules/model/firebase/firebaseTimeDataModel'
import { Observer } from "firebase";
const FirebaseModule = namespace(firebaseStore.name)

@Component({
  components: {
    TimeDataChart
  },
  data: () => ({
  }),
  watch: {
    tryList (newVal:Array<Try>, oldVal:Array<Try>) {
      console.log('tryList', newVal, oldVal)
    }
  }
})
export default class CreateBestDay extends Vue {
  // @Prop()
  @FirebaseModule.State tryList:Array<Try>
  @FirebaseModule.State user:User

  nowDateString: string = ''
  timeDataList: Array<TimeData> = []
  chartData: Object = {}
  chartOptions: Object = {}

  created () {
  }
  mounted () {
    this.nowDateString = new utility().getDateString(new Date)
    this.chartUpdate()
  }
  tryRegist (item:Try) {
    console.log(item.content)
    let data = new TimeData(this.user.uid, new Date, new Date, 10, item.content, 'comment test', item.color)
    this.timeDataList.push(data)
  }
  tryCreate () {
  }
  chartUpdate () {
    this.chartData = {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    }
    console.log('chartData', this.chartData)
  }
  tapDelete (index) {
    let deleteData = this.timeDataList[index]
    this.timeDataList = this.timeDataList.filter(obj => obj !== deleteData)
  }
}
</script>
<style scoped lang="scss">

$body-margin: 0px 10px 0px 10px;;

// ■ ボタン.
.buttonBody {
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

// ■ nowDate
.nowDate{
  border-radius: 5px;
  background: rgba(10, 6, 243, 0.2);
  color: #fff;
  font-family: "Open Sans", sas-serif;
  font-size: 1.8em;
  padding: 0.1em;
  text-align: center;
}

// ■ table.
.tableBody {
  margin: $body-margin;
}

$table-breakpoint: 480px;
$table-background-color: #FFF;
$table-text-color: #024457;
$table-outer-border: 1px solid #167F92;
$table-cell-border: 1px solid #D9E4E6;

// Extra options for table style (parse these arguments when including your mixin)
$table-border-radius: 10px;
$table-highlight-color: #EAF3F3;
$table-header-background-color: #167F92;
$table-header-text-color: #FFF;
$table-header-border: 1px solid #FFF;

// The Responstable mixin
@mixin responstable(
  $breakpoint: $table-breakpoint,
  $background-color: $table-background-color,
  $text-color: $table-text-color,
  $outer-border: $table-outer-border,
  $cell-border: $table-cell-border,
  $border-radius: none,
  $highlight-color: none,
  $header-background-color: $table-background-color,
  $header-text-color: $table-text-color,
  $header-border: $table-cell-border) {

  .responstable {
    margin: 1em 0;
    width: 100%;
    background: $background-color;
    color: $text-color;
    border-radius: $border-radius;
    border: $outer-border;
    overflow: hidden;
  
    tr {
      border-top: $outer-border;
      border-bottom: $outer-border;
      &:nth-child(odd) {  
        background-color: $highlight-color;
      }  
    }
  
    th {
      display: none; // hide the table headers for mobile
      border: $header-border;
      background-color: $header-background-color;
      color: $header-text-color;
    }
  
    td {
      display: block; // display the table as a block element for mobile   
      &:first-child {
        padding-top: .5em;
      }
      &:last-child {
        padding-bottom: .5em;
      }
      &:before {
        content: attr(data-th)": "; // grab the headers from the data-th and put them before every table cell for mobile
        font-weight: bold;
        width: 8em;
        display: inline-block;       
        @media (min-width: $breakpoint) {
          display: none; // do not display the data-th for desktop
        }
      }
      @media (min-width: $breakpoint) {
        border: $cell-border;
      }
    }
  
    th, td {
      text-align: left;
      margin: .5em 1em;  
      @media (min-width: $breakpoint) {
        display: table-cell; // turn the table into a 'normal' table-cell for desktop
        padding: 1em;
        &:first-child {
          text-align: center;
        }
        &:last-child {
          text-align: center;
        }
      }
    }  
  }
}

// Include the mixin (with extra options as overrides)
@include responstable(
  $border-radius: $table-border-radius,
  $highlight-color: $table-highlight-color,
  $header-background-color: $table-header-background-color,
  $header-text-color: $table-header-text-color,
  $header-border: $table-header-border);

.deleteBtn {
  text-decoration: none;
  text-transform: none;
  position: relative;
  display: inline-block;
}

.deleteBtn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
}
// ■ description
.descriptionBody {
  margin: $body-margin;
  font-family: "Open Sans", sas-serif;
  font-size: 1.8em;
  padding: 0.3em;
  text-align: center;
}

// ■ TimeChart.
.timeChartBody {
  margin: $body-margin;
}

</style>
