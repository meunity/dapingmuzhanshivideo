<template>
    <div class="liquidfill-cahrt" ref="chart">

    </div>
</template>
<script>
const EChart = require("echarts")
import 'echarts-liquidfill'
export default {
    props: {
        value: [Number, String],
        title: String
    },
    data() {
        return {}
    },
    methods: {
        renderChart() {
            let myChart = EChart.init(this.$refs.chart)
            let  option = {
                series: [{
                    type: 'liquidFill',
                    radius: '80%',
                    data: [{
                        value: 0.6,
                        itemStyle: {
                            normal:{
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
                                opacity: 0.6
                            }
                            
                        },
                        emphasis: {
                            itemStyle: {
                                opacity: 0.9
                            }
                        }
                    }],
                    outline: {
                        borderDistance: 2,
                        itemStyle: {
                            borderColor: '#ffffff',
                            borderWidth: 2,
                        }
                    },
                    backgroundStyle: {
                        borderWidth: 5,
                        borderColor: 'none',
                        color: 'rgba(0,0,0,0)'
                    },
                    label: {
                        formatter: `${this.value}亿m³\n\n{a|${this.title}}`,
                        fontSize: 18,
                        color: '#ffffff',
                        textStyle:{
                            rich:{
                                a:{
                                    fontSize: 14,
                                    align:'center',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                },
                            }
                        }
                    }
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
.liquidfill-cahrt{
    height: 200px;
}
</style>
