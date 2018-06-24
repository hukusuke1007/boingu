<script>
// 1. Chart.jsをインポートして、グローバルChartオブジェクトを使用できるようにします。
// mport Chart from 'chart.js'
import { Pie } from 'vue-chartjs'
/*
// ポジション変更
Chart.Tooltip.positioners = {
    average: (elements) => {
        if (!elements.length) {
            return false;
        }

        var i, len;
        var x = 0;
        var y = 0;
        var count = 0;

        for (i = 0, len = elements.length; i < len; ++i) {
            var el = elements[i];
            if (el && el.hasValue()) {
            var pos = el.tooltipPosition();
            // pos.x が 100 以上 = 右側に表示 -> x に20 足して、干渉しないように。
            var length = Math.sqrt((pos.x - 200) ** 2 + (pos.y - 200) ** 2);
            if (pos.x >= 200 && pos.y >= 200) {
                x = 200 + 150 * (pos.x - 200) / length;
                y = 200 + 150 * (pos.y - 200) / length;
                //   x = pos.x;
            } else if (pos.x >= 200 && pos.y <= 200) {
                x = 200 + 150 * (pos.x - 200) / length;
                y = 200 + 150 * (pos.y - 200) / length;
            } else if (pos.x <= 200 && pos.y <= 200) {
                x = 200 + 150 * (pos.x - 200) / length;
                y = 200 + 150 * (pos.y - 200) / length;
            } else if (pos.x <= 200 && pos.y >= 200) {
                x = 200 + 150 * (pos.x - 200) / length;
                y = 200 + 150 * (pos.y - 200) / length;
            }
            ++count;
            }
        }

        return {
            x: Math.round(x / count),
            y: Math.round(y / count)
        }
    }
}
*/
export default {
    extends: Pie,
    props: {
        chartData: {
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
        this.setOptions()
        this.setPlugin()
    },
    methods: {
        setOptions () {
            this.options = {
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
        },
        setPlugin () {
            this.addPlugin({
                /*
                id: 'myPlugin',
                beforeRender: (chart) => {
                    if (chart.config.options.showAllTooltips) {
                        // create an array of tooltips
                        // we can't use the chart tooltip because there is only one tooltip per chart
                        chart.pluginTooltips = [];
                        chart.config.data.datasets.forEach(function (dataset, i) {
                            chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                                chart.pluginTooltips.push(new Chart.Tooltip({
                                    _chart: chart.chart,
                                    _chartInstance: chart,
                                    _data: chart.data,
                                    _options: chart.options.tooltips,
                                    _active: [sector]
                                }, chart));
                            });
                        });

                        // turn off normal tooltips
                        chart.options.tooltips.enabled = false;
                    }
                },
                afterDraw: (chart, easing) => {
                    if (chart.config.options.showAllTooltips) {
                        // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
                        if (!chart.allTooltipsOnce) {
                            if (easing !== 1)
                                return;
                            chart.allTooltipsOnce = true;
                        }

                        // turn on tooltips
                        chart.options.tooltips.enabled = true;
                        Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                            tooltip.initialize();
                            tooltip.update();
                            // we don't actually need this since we are not animating tooltips
                            tooltip.pivot();
                            tooltip.transition(easing).draw();
                        });
                        chart.options.tooltips.enabled = false;
                    }
                }
                */
            })
        }
    }
}
</script>
