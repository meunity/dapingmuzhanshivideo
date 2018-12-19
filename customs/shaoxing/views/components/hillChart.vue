<template>
    <div class="hill-chart" ref="chart"></div>
</template>
<script>
const EChart = require("echarts");
export default {
    props: {
        chartData: Array,
        grid: {
            type: Object,
            default: function(){
                return {
                    top: 10,
                    bottom: 20,
                    left: 55,
                    right: 0
                }
            }
        },
        yLabelShow: {
            type: Boolean,
            default: true
        },
        splitLineShow: {
            type: Boolean,
            default: true
        },
        labelShow: {
            type: Boolean,
            default: false
        },
        formatterUnit: {
            type: Boolean,
            default: false
        } 
    },
    data() {
        return {}
    },
    mounted() {
        this.renderChart()
    },
    methods: {
        renderChart() {
            let myChart = EChart.init(this.$refs.chart)
            let self = this
            let option = {
                grid: this.grid,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    formatter: function (params) {
                        return params[0].name + ': ' + params[0].value;
                    }
                },
                xAxis: {
                    data: this.chartData.map(d => { return d.name}),
                    axisTick: {show: false},
                    axisLine: {show: false},
                    axisLabel: {
                        color: '#747474',
                    }
                },
                yAxis: {
                    splitLine: {
                        show: this.splitLineShow,
                        lineStyle: {
                            type: 'dotted',
                            color: '#5A5A5A'
                        }
                    },
                    axisTick: {show: false},
                    axisLine: {show: false},
                    axisLabel: {
                        show: this.yLabelShow,
                        color: '#747474',
                        formatter: function(val){
                            if(self.formatterUnit)
                                return val/1000 + 'km'
                                else{
                                    return val
                                }
                        }
                    }
                },
                color: ['#e54035'],
                series: [{
                    name: 'hill',
                    type: 'pictorialBar',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    label: {
                        show: this.labelShow,
                        position: 'top',
                        color: '#C0C0C0'
                    },
                    itemStyle: {
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
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: this.chartData,
                }]
            };
            myChart.setOption(option)
        }
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
.hill-chart{
    height: 150px;
}
</style>
