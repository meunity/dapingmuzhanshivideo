<template>
    <div class="pie-chart" ref="chart"></div>
</template>
<script>
const EChart = require("echarts")
export default {
    props: {
        title: String,
        value: [Number, String],
        unit: {
            type: String,
            default: '万吨'
        },
        radius: {
            type: Array,
            default: function(){
                return ['60%', '70%']
            }
        },
        textStyle: {
            type: Object,
            default: function() {
                return{
                    color: '#333333',
                    fontSize: 14
                }
            }
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
                title: {
                    text: self.title,
                    bottom: 0,
                    x: 'center',
                    textStyle:this.textStyle
                },
                legend: {
                    orient: 'vertical',
                    x: 'center',
                    y: 'center',
                    data:['总用水量'],
                    itemWidth: 0,
                    formatter: function(name){
                        return `{a|${self.value}}{b|${self.unit.length>0?'\n'+self.unit:''}}`
                    },
                    textStyle:{
                        rich:{
                            a:{
                                fontSize:20,
                                align:'center',
                                color: '#ffffff',
                                fontWeight: 'bold',
                            },
                            b:{
                                color: '#747474',
                                fontSize:12,
                                align:'center',
                                lineHeight:25
                            }
                        }
                    }
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: this.radius,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:30, name:'',itemStyle:{
                                color: '#454545'
                            }},
                            {value:70, name:'总用水量',itemStyle: {
                                color:{
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: '#F1F1F1' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: '#817F7F' // 100% 处的颜色
                                        }],
                                    }
                            }}
                        ]
                    }
                ]
            };
            myChart.setOption(option)
        },
    },
    mounted() {
        this.renderChart()
    },
    watch: {
        value(val){
            this.renderChart()
        }
    }
}
</script>
<style lang="less" scoped>
.pie-chart{
    height: 160px;
}
</style>
