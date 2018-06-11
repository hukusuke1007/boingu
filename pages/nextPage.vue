<template>
  <section>
  <v-flex>
    <h3>Next Page {{ id }}</h3>
    {{ message }}
  </v-flex>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
@Component({
  components: {
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    message: {
      type: String,
      default: 'default'
    }
  },
  watch: {
    message (oldVal, newVal) {
      console.log(oldVal, newVal)
    }
  }
})
export default class nextPage extends Vue {
  // function.
  created() {
    console.log('created before DOM')
  }
  mounted() {
    console.log('mounted after DOM')
  }
}
</script>
<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana,
    sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>