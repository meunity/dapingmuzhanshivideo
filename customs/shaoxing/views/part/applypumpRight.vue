<template>
    <div class="applypump-right">
        <panle title="城市用水组成">
            <el-row>
                <el-col :span="8">
                    <pie-chart title="总用水量" :value="(cityWaterUseData.total/10000).toFixed(0)"></pie-chart>
                </el-col>
                <el-col :span="16" class="water-category">
                    <div class="water-category-item" v-for="data in cityWaterUseData.pipeData" :key="data.name">
                        <span class="pct">{{(data.value/cityWaterUseData.total*100).toFixed(2)}}%</span><br/>
                        <span class="name">{{data.name}}</span>
                    </div>
                </el-col>
            </el-row>
        </panle>

        <panle title="热线信息">
            <hill-chart :chart-data="showSource" v-if="showSource" :grid="{top: 10,bottom: 20,left: 0,right: 0}"
            :y-label-show="false" :split-line-show="false" :label-show="true"></hill-chart>
        </panle>

        <panle title="产销差率">
            <div class="cxc-chart" ref="cxc"></div>
            <div class="cxc-rank">
                <p>分区产销差率排名</p>
                <table>
                    <tr v-for="item in cxcData.cxcRank" :key="item.name">
                        <td width="10%" style="line-height:36px;color:#747474;">{{item.name}}</td>
                        <td width="80%">
                            <div class="bar">
                                <div class="process" :style="{'width': item.value*10+'%'}"></div>
                            </div>
                        </td>
                        <td width="10%">{{item.value}}%</td>
                    </tr>  
                </table>
            </div>
        </panle>
    </div>
</template>
<script>
const EChart = require("echarts")
import panle from '../components/panle.vue'
import PieChart from '../components/pieChart.vue'
import HillChart from '../components/hillChart.vue'
import { API } from '../modules/service.js'
export default {
    components: { panle, PieChart, HillChart },
    data() {
        return {
            cityWaterUseData: {
                total: 67875478,
                pipeData: [
                    {name: '居民用水', value: 33966938},
                    {name: '行政事业', value: 4044801},
                    {name: '工业用水', value: 17032518},
                    {name: '经营服务', value: 12346867},
                    {name: '特种行业', value: 482446},
                ]
            },
            sourceData: [],
            cxcData: {
                gsl: 9925.05,
                ssl: 6787.55,
                wjl: 20.89,
                cxcRate: 3.82,
                cxcRank: [
                    {name: '越城', value: 5.37},
                    {name: '城南', value: 3.90},
                    {name: '城东', value: 3.33},
                    {name: '袍江', value: 2.29},
                    {name: '镜湖', value: 0.86},
                ]
            }
        }
    },
    computed: {
        sumSource() {
            let s = 0
            if(this.sourceData.length > 0)
                this.sourceData.forEach((val, i) => {
                    s += val.value
                })
            return s
        },
        showSource() {
            let array = []
            let count = 0
            let sum = 0
            if(this.sourceData.length > 4){
                for(let i = 0; i < this.sourceData.length-1; i++){
                    if(this.sourceData[i].name != "undefined" && this.sourceData[i].name != ''){
                        array.push(this.sourceData[i])
                        count++
                        sum += this.sourceData[i].value
                    }
                    if(count>=4){
                        break
                    }
                }
                array.push({name: '其他', value: this.sumSource - sum})
            }else{
                array = this.sourceData
            }
            return array
        }
    },
    methods: {
        renderCxcChart(){
            let myChart = EChart.init(this.$refs.cxc)
            let self = this
            let option = {
                title: {
                    text: `{a|${self.cxcData.cxcRate}%}\n{b|产销差率}`,
                    bottom: '35%',
                    left: '18%',
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
                legend: {
                    orient: 'vertical',
                    x: '50%',
                    y: 'center',
                    data:[{name:'售水量',icon:'rect'},{name:'供水量',icon:'rect'},{name:'未计量水量',icon:'rect'}],
                    itemWidth: 10,
                    itemHeight: 10,
                    padding: [10,0,0,0],
                    formatter: function(name){
                        let data = 0
                        if(name == '供水量')
                            data = self.cxcData.gsl
                        else if(name == '售水量')
                            data = self.cxcData.ssl
                        else
                            data = self.cxcData.wjl
                        return `{b|${name}(万m³)}{a|${data}}`
                    },
                    textStyle:{
                        // padding:[30,0,0,0],
                        rich:{
                            a:{
                                fontSize:16,
                                align:'center',
                                color: '#ffffff',
                                // fontWeight: 'bold',
                                lineHeight:32,
                                align: 'right',
                                width: 80,
                            },
                            b:{
                                color: '#747474',
                                fontSize:14,
                                align:'left',
                                width: 100,
                            }
                        }
                    }
                },
                series: [
                    {
                        name:'产销差',
                        type:'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        center: ['25%','50%'],
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
                            {value:0, name:'售水量',itemStyle:{
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
                            }},
                            {value:0, name:'未计量水量',itemStyle:{
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
                            }},
                            {value:70, name:'供水量',itemStyle: {
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
        getData() {
            let gs = { prefix: 'sxgs', Token: '57938fae42de38519530128f'}
            let self = this
            API.getScadaEvent(
                Object.assign({}, gs, {
                    query: {
                        // created: { $gte: n_year },
                        cid: '5514076f42de3814dd180529',
                        type: 'rx'
                    },
                    order: [{ Field: 'created', Type: true }],
                    size: 9999,
                    index: 1
                })
            ).done(function(r) {
                if (r) {
                    if (r.rows.length > 0) {
                        var reto = {}
                        $.each(r.rows, function(ri, rv) {
                            reto[rv.sjly_nm] = (reto[rv.sjly_nm] || 0) + 1
                        })
                        var reta = []
                        Object.keys(reto).forEach((key, i) => {
                            reta.push({ name: key, value: reto[key] })
                        })
                        reta.sort(function(x, y) {
                            if (x.value > y.value) {
                                return -1
                            }
                            if (x.value < y.value) {
                                return 1
                            }
                            return 0
                        })
                        self.sourceData = reta
                    }
                }
            })
        }
    },
    mounted() {
        this.renderCxcChart()
        this.getData()
    },
}
</script>
<style lang="less" scoped>
@gray: #747474;
.applypump-right{
    width: 23%;
    float: left;
    height: 100%;
    color: white;
    box-sizing: border-box;
    border-left: 1px solid #4A4B4B;
    background-color: rgba(41,46,51,0.8);
    .water-category{
        // padding-top: 10px;
        .water-category-item{
            display: inline-block;
            border-top: 2px solid @gray;
            margin-right: 20px;
            margin-top: 30px;
            .pct{
                font-size: 12px;
            }
            .name{
                color: @gray;
            }
        }
    }
    .chart{
        height: 160px;
    }
    .cxc-chart{
        height: 200px;
    }
    .cxc-rank{
        table{
            width: 100%;
            .bar{
                height: 10px;
                width: 100%;
                background-color: #454545;
                border-radius: 5px;
                line-height: 28px;
                .process{
                    height: 100%;
                    border-radius: 5px;
                    background: linear-gradient(to right, #3C3B3B , #B2B1B1);
                }
            }
        }
    }
}
</style>
