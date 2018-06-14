<template>
<div class="buttonBody">
  <v-flex>
    <span v-for="(item, key, index) in tryList" :key="index">
      <a href="#" class="btn" @click="tryRegist(item)" v-bind:class="item.color">{{ item.content }}</a>
    </span>
      <a href="#" class="btn red" @click="tryCreate()">+</a>
  </v-flex>
  <v-flex class="tableBody">
    <table class="responstable">
      <tr>
        <th>Main driver</th>
        <th>First name</th>
        <th>Surname</th>
        <th>Date of birth</th>
        <th>Relationship</th>
      </tr>
      
      <tr>
        <td data-th="Main driver"><input type="radio"/></td>
        <td data-th="First name">Steve</td>
        <td data-th="Surname">Foo</td>
        <td data-th="Date of birth">01/01/1978</td>
        <td data-th="Relationship">Policyholder</td>
      </tr>
      
      <tr>
        <td data-th="Main driver"><input type="radio"/></td>
        <td data-th="First name">Steffie</td>
        <td data-th="Surname">Foo</td>
        <td data-th="Date of birth">01/01/1978</td>
        <td data-th="Relationship">Spouse</td>
      </tr>
      
      <tr>
        <td data-th="Main driver"><input type="radio"/></td>
        <td data-th="First name">Stan</td>
        <td data-th="Surname">Foo</td>
        <td data-th="Date of birth">01/01/1994</td>
        <td data-th="Relationship">Son</td>
      </tr>
      
      <tr>
        <td data-th="Main driver"><input type="radio"/></td>
        <td data-th="First name">Stella</td>
        <td data-th="Surname">Foo</td>
        <td data-th="Date of birth">01/01/1992</td>
        <td data-th="Relationship">Daughter</td>
      </tr>
      
    </table>
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
<style scoped lang="scss">

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

// ■ table.
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
.tableBody {
  margin: 0px 10px 0px 10px;
}
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

// General styles

body {
  padding: 0 2em;
  font-family: Arial, sans-serif;
  color: #024457;
  background: #f2f2f2;
}

h1 {
  font-family: Verdana;
  font-weight: normal;
  color: #024457;
  span { color: #167F92;}
}
</style>
