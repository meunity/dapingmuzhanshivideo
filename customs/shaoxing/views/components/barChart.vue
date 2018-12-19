<template>
    <div class="bar-chart" ref="chart"></div>
</template>
<script>
const EChart = require("echarts");
export default {
    props: {
        chartData: Array,
        formatterUnit: {
            type: Boolean,
            default: false
        } 
    },
    data() {
        return {}
    },
    methods: {
        renderChart() {
            let myChart = EChart.init(this.$refs.chart)
            let self = this
            let option = {
                grid: {
                    top: 10,
                    bottom: 20,
                    left: 55,
                    right: 0
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: this.chartData.map(p => {return p.name}),
                    axisLine: {
                        show:false
                    },
                    axisTick: {
                        show:false
                    },
                    axisLabel: {
                        color: '#747474',
                    }
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dotted',
                            color: '#5A5A5A'
                        }
                    },
                    axisLabel: {
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
                series: [{
                    data: this.chartData,
                    type: 'bar',
                    barWidth : 30,
                    itemStyle:{
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
                    }
                    },
                }]
            };
            myChart.setOption(option)
        }
    },
    mounted() {
        this.renderChart()
    },
}
</script>
<style lang="less" scoped>
.bar-chart{
    height: 150px;
}
</style>
