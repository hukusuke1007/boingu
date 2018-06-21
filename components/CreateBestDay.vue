<template>
<div class="body">
  <v-flex  style="margin-top: 8px;">
    <v-btn round large color="twitter white--text" class="shareBtn" @click="tapShare()">ツイートする</v-btn>
  </v-flex >
  <v-flex>
    <span v-for="(item, key, index) in tryList" :key="index">
      <a href="#" class="addBtn" @click="tryRegist(item)" v-bind:class="item.color">{{ item.content }}</a>
    </span>
      <a href="#" class="addBtn red" @click="tryCreate()">+</a>
  </v-flex>
  <v-flex class="tableBody">
    <div class="nowDate">
      {{ nowDateString }}
    </div>
    <table class="responstable">
      <tr>
        <th>リソース</th><th>内容</th><th></th>
      </tr>
        <tr v-for="(item, key, index) in timeDataList" :key="index">
          <td data-th="時間">{{ item.time }}</td>
          <td data-th="内容">{{ item.content }}</td>
          <!-- <td data-th="コメント">{{ item.comment }}</td> -->
          <td data-th=""><a href="#" class="deleteBtn" @click="tapDelete(key)"><v-icon color="grey">delete</v-icon></a>
          </td>
        </tr>
    </table>
    <div class="descriptionBody" v-if="timeDataList.length===0">
      <!-- 今日もお疲れ様でした！<br>今日の自分を記録してみませんか？ -->
    </div>
  </v-flex>
  <v-flex class="timeChartBody" ref="timaChart">
    <TimeDataChart 
       v-bind:chartData="chartData"
       v-bind:options="chartOptions"
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
import html2canvas from 'html2canvas'

import TimeDataChart from '~/components/TimeDataChart.vue'
import utility from '~/modules/utils/utility'

import * as firebaseStore from '~/store/firebase'
import User from '~/modules/model/firebase/firebaseUserModel'
import Try from '~/modules/model/firebase/firebaseTryModel'
import TimeData from '~/modules/model/firebase/firebaseTimeDataModel'
import { firebaseWrapper } from '~/modules/wrapper/firebaseWrapper'

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
  @FirebaseModule.Action doSet
  @FirebaseModule.Action doUpdateFile
  @FirebaseModule.State tryList:Array<Try>
  @FirebaseModule.State user:User

  nowDateString: string = ''
  timeDataList: Array<TimeData> = []
  chartData: Object = {}
  chartOptions: Object = {}
  util = new utility()

  created () {
  }
  mounted () {
    this.nowDateString = this.util.getDateString(new Date)
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
      labels: ["睡眠", "食事", "仕事", "趣味", "仕事", "趣味"],
      datasets: [
        {
            label: '# of Votes',
            data: [2, 4, 6, 2, 1, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }
      ]
    }
    this.chartOptions = {
        responsive: true,
        showAllTooltips: true,
        title: {
            display: true,
            position: "top",
            text: "今日頑張った人",
            fontSize: 18,
            fontColor: "#111"
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 16
            }
        },
        tooltips: {
          enabled: true,
          bodyFontSize: 16,
          callbacks: {
            label: (tooltipItem, data) => {
              let dataset = data.datasets[tooltipItem.datasetIndex]
              let label = data.labels[tooltipItem.index]
              //calculate the total of this data set
              let total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              })
              //get the current items value
              let currentValue = dataset.data[tooltipItem.index]
              //calculate the percentage based on the total and current item, also this does a rough rounding to give a whole number
              let percentage = Math.floor(((currentValue/total) * 100) + 0.5)
              return label + ' ' + percentage + '%';
            }
          }
        }
    }
    console.log('chartData', this.chartData)
  }
  tapDelete (index) {
    let deleteData = this.timeDataList[index]
    this.timeDataList = this.timeDataList.filter(obj => obj !== deleteData)
  }
  tapShare () {
    /*
    html2canvas(this.$refs.timaChart)
      .then((canvas) => {
        let Blob = this.util.toBlob(canvas.toDataURL('image/png'))
        this.doUpdateFile(Blob)
        // this.imageDownload(dataURI, canvas, 'image')
      }).catch((error) => {
        console.error(error)
      })
    */
   this.tapDownload()
  }
  tapDownload () {
    let wrapper = new firebaseWrapper()
    let folder = 'images'
    let filename = 'boingu_164224f1a4aa74ad3681e8fc00_20180621.png'
    wrapper.downloadFile(folder, filename)
     .then((result) => {
       this.imageDownload(result, null, null)
     }).catch((error) => {
       console.error('tapDownload', error)
     })
  }
  imageDownload (dataURI, canvas, type) {
    // console.log('canvasSize', canvas.height, canvas.width)
    let imageName = 'boingu' + '_' + this.util.getUniqueString() + "_" + this.util.getDateStringLabel(new Date)
    let event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    let a = document.createElement('a')
    a.href = dataURI
    a.download = imageName
    a.dispatchEvent(event)
  }
}
</script>
<style scoped lang="scss">

$body-margin: 0px 10px 0px 10px;;

// ■ ボタン.
.body {
  font-family: 'Open Sans', 'sans-serif';
  background-color: #fff;
}

.addBtn {
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

.addBtn:active {
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
          // text-align: center;
          width: 7em;
        }
        &:last-child {
          width: 5em;
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
  // margin: $body-margin;
  margin: auto;

  // breakpoint以上.
  @media (min-width: 600px) {
    width: 600px;
    height: 600px;
  }
  // breakpoint未満
  @media (max-width: 340px) {
    width: 340px;
    height: 340px;
  }
}

</style>
