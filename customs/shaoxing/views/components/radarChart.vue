<template>
    <div class="radar-chart" ref="chart"></div>
</template>
<script>
const EChart = require("echarts");
export default {
    props: {
        chartData: Array,
        title: String,
        name: String
    },
    data() {
        return {}
    },
    methods: {
        renderChart() {
            let myChart = EChart.init(this.$refs.chart)
            let option = {
                tooltip: {
                    trigger: 'axis'
                },

                radar: [
                    {
                        indicator: this.chartData.map(c => {
                            return {text: c.name, max: this.max + 1}
                        }),
                        center: ['50%','50%'],
                        // radius: 80,
                        shape: 'circle',
                        splitArea: {
                            show: false
                        },
                        name: {
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        radius: 40,
                        splitLine: {
                            lineStyle: {
                                color: '#171616'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#171616'
                            }
                        }
                    },

                ],
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        symbol: 'none',
                        itemStyle: {normal: {color: '#ffffff'}},
                        data: [
                            {
                                value: this.chartData.map(c => {
                                    return c.value
                                }),
                                name: '供水量'
                            }
                        ],
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(233,233,233,.5)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(233,233,233,.1)' // 100% 处的颜色
                                    }],
                                },
                                opacity: 0.5
                            }
                        }
                    },
                ]
            }
            myChart.setOption(option)
        }
    },
    computed: {
        max() {
            return Math.max.apply(null,this.chartData.map(c => {return c.value}))
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.renderChart()
        })
    },
    watch: {
        chartData:{
            deep: true,
            handler(val){
                this.renderChart()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.radar-chart{
    height: 200px;
}
</style>
