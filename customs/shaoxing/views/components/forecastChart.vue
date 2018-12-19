<template>
    <div class="forecast-chart">
        <table class="summarization" cellspacing="0" cellpadding="0" border="0">
            <tr v-for="item in forecastData.summarization" :key="item.name">
              <!-- <td width="20%"><div class="dot">...</div></td> -->
              <td width="30%">{{item.value}}</td>
              <td class="text-gray">{{item.name}}({{item.unit}})</td>
            </tr>
        </table>
        <div ref="chart" class="chart"></div>
    </div>
</template>
<script>
const EChart = require("echarts");
export default {
    props: {
        forecastData: Object
    },
    data() {
        return {}
    },
    mounted() {
        this.renderChart()
    },
    methods: {
        renderChart(){
            let myChart = EChart.init(this.$refs.chart)
            let option = {
                grid: {
                    top: 10,
                    bottom: 20,
                    left: 40,
                    right:0
                },
                tooltip: {
                    triggerOn: 'none',
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.forecastData.forecast.map(c => { return c.Time}),
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisPointer: {
                        value: this.forecastData.history[this.forecastData.history.length - 1].Time+'',
                        snap: false,
                        lineStyle: {
                            color: 'red',
                            opacity: 0.5,
                            width: 2
                        },
                        label: {
                            show: false,
                        },
                        handle: {
                            show: true,
                            size: 0,
                        }
                    },
                    axisLabel: {
                        formatter: function(val){
                            return new Date(val * 1000).FormatString('HH')
                        },
                        color: '#747474'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
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
                            return val/1000 + 'k'
                        }
                    }
                },
                series: [{
                    data: this.forecastData.forecast.map(c => { return c.Val}),
                    type: 'line',
                    symbol: 'none',
                    areaStyle: {
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
                    itemStyle: {
                        color: '#E9E9E9'
                    }
                }]
            }
            myChart.setOption(option)
        }
    },
    watch: {
        forecastData:{
            deep: true,
            handler(val){
                this.renderChart()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.forecast-chart{
    .chart{
        height: 150px;
    }
    .text-gray{
        color: #747474;
    }
    .summarization{
        width: 100%;
        font-size: 12px;
        tr{
            line-height: 22px;
            &:first-of-type{
            background: linear-gradient(to right, #080808 , #202126);
            }
            // .dot{
            //     display: inline-block;
            //     vertical-align: super;
            // }
        }
    }
}
</style>
