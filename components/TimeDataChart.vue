<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    props: {
        chartData: {
            type: Object,
            default: {}
        },
        options: {
            type: Object,
            default: {}
        }
    },
    data: () => ({
    }),
    watch: {
        chartData (newVal, oldVal) {
            this.renderChart(this.chartData, this.options)
        }
    },
    mounted () {
    }
}
</script>
