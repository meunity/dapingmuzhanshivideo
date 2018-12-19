<template>
    <div class="front-bottom">
        <div class="icon-wrapper" v-if="theme == 'check'">
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    当前供水量（万m3）
                </div>
                <div class="sg-num">
                    {{sldata.todaysupplyFlux}}
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    昨日总供水量（万m3）
                </div>
                <div class="sg-num">
                    <!-- {{sldata.yesterdaysupplyFlux}} -->31.3
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    最高日供水量（万m3）
                </div>
                <div class="sg-num">
                    35
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    中心区压力（MPa）
                </div>
                <div class="sg-num">
                    <!-- {{centerPressure}} -->0.28
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    末梢压力（MPa）
                </div>
                <div class="sg-num">
                    0.24
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    当前排水量（万m3）
                </div>
                <div class="sg-num">
                    {{sldata.todaypumpFlux}}
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    昨日总排水量（万m3）
                </div>
                <div class="sg-num">
                    {{sldata.yesterdaypumpFlux}}
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    最高日排水量（万m3）
                </div>
                <div class="sg-num">
                    26
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon-red">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    今日排水报警总数
                </div>
                <div class="sg-num">
                    {{sldata.pumpAlarm}}
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
            <div class="sg-icon">
                <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                <div class="sg-pot">
                </div>
                <div class="sg-text">
                    重点排水企业总数
                </div>
                <div class="sg-num">
                    151
                </div>
                <div class="clear">
                    <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                    <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                </div>
            </div>
        </div>
        <div v-if="theme == 'applypump'" class="chart-warp">
            <el-row type="flex">
                <el-col :span="6" class="chart-warp-border">
                    <div class="chart-warp-title">区域日供水量</div>
                    <radar-chart :chart-data="areaWaterSupplyData"></radar-chart>
                </el-col>
                <el-col :span="6" class="chart-warp-border">
                    <div class="chart-warp-title">泵站排水量</div>
                    <pie-chart title="泵站排水总量" :value="26" :text-style="{color: '#ffffff',fontSize: 14}" :radius="['50%', '60%']"></pie-chart>
                </el-col>
                <el-col :span="12" class="chart-warp-border">
                    <div class="chart-warp-title">原水水库</div>
                    <el-row>
                        <el-col :span="6">
                            <liquidfill-chart :value="5.8" :title="'总库量'"></liquidfill-chart>
                        </el-col>
                        <el-col :span="6">
                            <liquidfill-chart :value="1.2" :title="'杨浦水库'"></liquidfill-chart>
                        </el-col>
                        <el-col :span="6">
                            <liquidfill-chart :value="2.7" :title="'平水江水库'"></liquidfill-chart>
                        </el-col>
                        <el-col :span="6">
                            <liquidfill-chart :value="2.5" :title="'曹娥江水库'"></liquidfill-chart>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
import { API } from '../../modules/service'
import RadarChart from '../../components/radarChart.vue'
import PieChart from '../../components/pieChart.vue'
import LiquidfillChart from '../../components/liquidfillChart.vue'
export default {
    props: {
        theme: String
    },
    data() {
        return {
            sldata: {
                yesterdaysupplyFlux: '',
                yesterdaypumpFlux: '',
                todaysupplyFlux: '',
                tudaypumpFlux: '',
                pumpAlarm: ''
            },
            areaWaterSupplyData: [
                {name: '越城', value: 10.5},
                {name: '袍江', value: 7.5},
                {name: '城东', value: 1.2},
                {name: '城南', value: 2.8},
                {name: '镜湖', value: 1.3},
            ]
        }
    },
    created() {},
    mounted() {
        let self = this
        self.getData()
    },
    computed: {
        centerPressure: function() {
            var Min = 0.26
            var Range = 0.29 - 0.26
            var Rand = Math.random()
            var num = Min + Math.round(Rand * Range) //四舍五入
            return num
        }
    },
    methods: {
        getData: function() {
            let self = this

            let today = new Date()
            let n_now = today.getTime() / 1000
            let td = new Date((today.getTime() / 1000) * 1000).FormatString(
                'yyyy-MM-dd'
            )
            let n_today = td.GetTime()
            let n_yesterday = n_today - 1 * 24 * 3600

            let gs = { prefix: 'sxgs', Token: '57938fae42de38519530128f' }
            let ps = { prefix: 'sxps', Token: '5bc7f401e138234b9d804891' }

            // 排水报警
            API.getHistoryAlarmData(
                Object.assign({}, ps, {
                    conditions: [
                        {
                            Field: 'st',
                            Value: n_today,
                            Operate: '>=',
                            Relation: 'and'
                        },
                        {
                            Field: 'ac.cid',
                            Operate: '=',
                            Value: '59005787a3d24b519845cbe3',
                            Relation: 'and'
                        }
                    ],

                    size: 1,
                    index: 1
                })
            ).done(function(r) {
                if (r) {
                    self.sldata.pumpAlarm = r.total
                }
            })

            API.geStationDetail(
                Object.assign({}, gs, {
                    Sid: ['DV_13341_P1'],
                    StationId: '400013341',
                    Begin: n_yesterday,
                    End: n_now,
                    Interval: 86400,
                    All: true
                })
            ).done(function(r) {
                if (r) {
                    //   let daily=r.Sensors[0]["Vals"][0].Report;
                    $.each(r.Sensors[0]['Vals'], function(ai, av) {
                        if (av.Time == n_today) {
                            self['sldata']['todaysupplyFlux'] = Math.round(
                                (av.Report.lastv - av.Report.firstv) / 10000
                            )
                        } else {
                            self['sldata']['yesterdaysupplyFlux'] = Math.round(
                                (av.Report.lastv - av.Report.firstv) / 10000
                            )
                        }
                    })
                }
            })

            API.geStationDetail(
                Object.assign({}, ps, {
                    Sid: ['QYJL_2017001_VSJ'],
                    StationId: '59a3ca96a3d24b74bdbb7245',
                    Begin: n_yesterday,
                    End: n_now,
                    Interval: 86400,
                    All: true
                })
            ).done(function(r) {
                if (r) {
                    $.each(r.Sensors[0]['Vals'], function(ai, av) {
                        if (av.Time == n_today) {
                            self['sldata']['todaypumpFlux'] = Math.round(
                                (av.Report.lastv - av.Report.firstv) / 10000
                            )
                        } else {
                            self['sldata']['yesterdaypumpFlux'] = Math.round(
                                (av.Report.lastv - av.Report.firstv) / 10000
                            )
                        }
                    })
                }
            })
        }
    },
    watch: {},
    components: { RadarChart, PieChart, LiquidfillChart }
}
</script>
<style lang="less" >
.front-bottom {
    position: absolute;
    z-index: 10001;
    bottom: 0;
    height: 120px;
    left: 23%;
    width: 54%;
    background-color: rgba(0,0,0,0.8);
    .icon-wrapper {
        width: 100%;
        height: 96px;
        // background: #000000;
        float: left;
        // margin-right: 30px;
        .sg-icon {
            // display: inline-block;
            float: left;
            width: 183px;
            height: 30px;
            border-radius: 0px;
            margin-top: 10px;
            margin-left: 16px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 12px;
            line-height: 30px;
            background-color: rgba(0,0,0,0.8);
            border-left: solid 2px #01cef6;
            border-right: solid 2px #01cef6;
            border-top: solid 1px #595a5a;
            border-bottom: solid 1px #595a5a;
            color: #747474;
            .sg-pot {
                margin-left: 4px;
                float: left;
                height: 4px;
                width: 4px;
                background: #e9e9e9;
                margin-top: 14px;
            }
            .sg-text {
                float: left;
                margin-left: 6px;
            }
            .sg-num {
                float: right;
                margin-right: 2px;
            }
            .clear {
                clear: both;
            }
        }
        .sg-icon-red {
            // display: inline-block;
            float: left;
            width: 183px;
            height: 30px;
            border-radius: 0px;
            margin-top: 10px;
            margin-left: 16px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 12px;
            line-height: 30px;
            background-color: #720b08;
            border-left: solid 2px #01cef6;
            border-right: solid 2px #01cef6;
            border-top: solid 1px #595a5a;
            border-bottom: solid 1px #595a5a;
            color: #e9e9e9;
            .sg-pot {
                margin-left: 4px;
                float: left;
                height: 4px;
                width: 4px;
                background: #f03939;
                margin-top: 14px;
            }
            .sg-text {
                float: left;
                margin-left: 6px;
            }
            .sg-num {
                float: right;
                margin-right: 2px;
            }
            .clear {
                clear: both;
            }
        }
    }
    .chart-warp{
        height: 200px;
        background: rgba(0,0,0,0.8);
        position: absolute;
        width: 100%;
        bottom: 0;
        border-top: solid 2px rgba(89, 90, 90, 0.8);
        .chart-warp-border{
            border-right: solid 2px rgba(89, 90, 90, 0.8);
            position: relative;
            &:last-of-type{
                border: none;
            }
            .chart-warp-title{
                color: #01CEF6;
                position: absolute;
                top: 5px;
                left: 5px;
            }
        }
    }
}
</style>