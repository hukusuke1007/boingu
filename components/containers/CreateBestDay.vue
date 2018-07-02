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
        <tr v-for="(item, key, index) in contents" :key="index">
          <td data-th="リソース">
            <v-menu offset-x>
              <v-btn slot="activator" fab small>{{ item.resource }}</v-btn>
              <v-list>
                <v-list-tile v-for="resource in resources" :key="resource" @click="tapResouce(key, resource)">
                  <v-list-tile-content>
                  <v-list-tile-title>{{ resource }} %</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
          <td data-th="内容">{{ item.content }}</td>
          <!-- <td data-th="コメント">{{ item.comment }}</td> -->
          <td data-th=""><a href="#" class="deleteBtn" @click="tapDelete(key)"><v-icon color="grey">delete</v-icon></a>
          </td>
        </tr>
    </table>
    <div class="descriptionBody" v-if="contents.length===0">
      <!-- 今日もお疲れ様でした！<br>今日の自分を記録してみませんか？ -->
    </div>
  </v-flex>
  <v-flex class="timeChartBody" ref="timaChart">
    <TimeDataChart 
       v-bind:chartData="chartData"
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

import TimeDataChart from '~/components/charts/TimeDataChart.vue'
import utility from '~/modules/utils/utility'

import * as firebaseStore from '~/store/firebase'
import User from '~/modules/model/firebase/firebaseUserModel'
import BestDay from '~/modules/model/firebase/firebaseBestDayModel'
import Content from '~/modules/model/firebase/firebaseBestDayContentModel'
import Try from '~/modules/model/firebase/firebaseTryModel'
import BestDayContent from '~/modules/model/firebase/firebaseBestDayContentModel'
import { firebaseController } from '~/modules/controller/firebaseController'

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
    },
    contents (newVal:Array<BestDayContent>, oldVal:Array<BestDayContent>) {
      console.log('contents', newVal, oldVal)
      this.chartUpdate()
    }
  }
})
export default class CreateBestDay extends Vue {
  // @Prop()
  @FirebaseModule.State tryList:Array<Try>
  @FirebaseModule.State user:User

  nowDateString: string = ''
  contents: Array<BestDayContent> = []
  chartData: Object = {}
  util = new utility()
  resources: Array<number> = [10, 30, 50, 70, 100]
  created () {
  }
  mounted () {
    this.nowDateString = this.util.getDateString(new Date)
    this.chartUpdate()
  }
  tryRegist (item:Try) {
    console.log(item.content)
    let data = new BestDayContent(10, item.content, 'comment test', item.color)
    this.contents.push(data)
  }
  tryCreate () {
  }
  getColorValidation(index): any {
    let result: any = {}
    switch (index) {
      case 0:
        result.bgColor = 'rgba(255, 99, 132, 0.2)'
        result.borderColor = 'rgba(255,99,132,1)'
        break
      case 1: 
        result.bgColor = 'rgba(54, 162, 235, 0.2)'
        result.borderColor = 'rgba(54, 162, 235, 1)'
        break
      case 2:
        result.bgColor = 'rgba(54, 162, 235, 0.2)'
        result.borderColor = 'rgba(54, 162, 235, 1)'
        break
      case 3:
        result.bgColor = 'rgba(255, 206, 86, 0.2)'
        result.borderColor = 'rgba(255, 206, 86, 1)'
        break
      case 4:
        result.bgColor = 'rgba(153, 102, 255, 0.2)'
        result.borderColor = 'rgba(153, 102, 255, 1)'
        break
      default:
        result.bgColor = 'rgba(153, 102, 255, 0.2)'
        result.borderColor = 'rgba(153, 102, 255, 1)'
        break
    }
    return result
  }
  chartUpdate () {
    let labels: Array<string> = []
    let bgColors: Array<string> = []
    let borderColors: Array<string> = []
    let datas: Array<number> = []
    this.contents.forEach((obj, index) => {
      let color: any = this.getColorValidation(index)
      labels.push(obj.content)
      bgColors.push(color.bgColor)
      borderColors.push(color.borderColor)
      datas.push(obj.resource)
    })
    if ( !('label' in this.chartData) ) {
      this.chartData = {
        labels: labels,
        datasets: [
          {
              label: '# of Votes',
              data: datas,
              backgroundColor: bgColors,
              borderColor: borderColors,
              borderWidth: 1
          }
        ]
      }
    } else {
      this.chartData['labels'] = labels
      this.chartData['datasets'][0].data = datas
      this.chartData['datasets'][0].backgroundColor = bgColors
      this.chartData['datasets'][0].borderColor = borderColors
    }
    console.log('chartData', this.chartData)
  }
  tapResouce (tableIndex:number, resource: number) {
    console.log('tapResouce', tableIndex, resource)
    this.contents = this.contents.filter( (obj, index) => {
      if (index == tableIndex) { obj.resource = resource }
      return obj
    })
  }
  tapDelete (tableIndex:number) {
    let deleteData = this.contents[tableIndex]
    this.contents = this.contents.filter(obj => obj !== deleteData)
  }
  async tapShare () {
    /*
    // await this.user.setBestDayReference()
    let result = await this.user.getBestDayReference()
    let id = result[0]
    let bestDay = new BestDay(this.user.uid, new Date(), new Date(), id)
    bestDay.setContents(this.contents)
    console.log(this.contents)
    await bestDay.setBestDay()
    let best = await bestDay.getBestDay()
    console.log('tapShare', result, best)
    */
    let message: string = "テストツイート"
    let canvas = await html2canvas(this.$refs.timaChart)
    let controller = new firebaseController(this.user)
    let Blob = this.util.toBlob(canvas.toDataURL('image/png'))
    controller.shareBestDay(message, this.contents, Blob)
  }
  /*
  tapDownload () {
    let wrapper = new firebaseController()
    let folder = 'images'
    let filename = 'boingu_164224f1a4aa74ad3681e8fc00_20180621.png'
    wrapper.downloadFile(folder, filename)
     .then((result) => {
       this.imageDownload(result, null, null)
     }).catch((error) => {
       console.error('tapDownload', error.code, error.message)
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
  */
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
