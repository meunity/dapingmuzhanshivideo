<template>
  <div class="part-right">
    <panle title="供水SCADA数据监测">
      <el-tabs v-model="applyData.activeName">
        <el-tab-pane label="供水压力监测" name="first">
          <el-table :data="applyData.pressData" style="width: 100%" height="158">
            <el-table-column prop="name" label="站点名"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column label="当前值" width="80">
              <template slot-scope="scope">
                <span :class="{'alarm':scope.row.alarm}">{{ scope.row.value }}</span>
                <!-- <i class="arrows " :class="{'up':scope.row.hb=='up','down':scope.row.hb=='down'}"></i> -->
              </template>
            </el-table-column>
            <el-table-column label="" width="50">
              <template slot-scope="scope">
                <i class="arrows " :class="{'up':scope.row.hb=='up','down':scope.row.hb=='down'}"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane label="大用户水量监测" name="second">大用户水量监测</el-tab-pane> -->

        <el-tab-pane label="区域水量监测" name="third">
          <el-table :data="applyData.areaWaterData" style="width: 100%" height="158">
            <el-table-column prop="name" label="站点名"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column label="当前值">
              <template slot-scope="scope">
                <span :class="{'alarm':scope.row.alarm}">{{ scope.row.value }}</span>
                <i class="arrows" :class="{'up':scope.row.hb=='up','down':scope.row.hb=='down'}"></i>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="水质监测" name="fourth">

          <el-table :data="applyData.waterQualityData" style="width: 100%;" height="158">
            <el-table-column prop="name" label="站点名" width="110"></el-table-column>
            <el-table-column prop="time" label="时间" width="75"></el-table-column>
            <el-table-column prop="zd" label="浊度" width="75"></el-table-column>
            <el-table-column prop="yul" label="余氯" width="75"></el-table-column>
            <el-table-column prop="ph" label="PH" ></el-table-column>

          </el-table>

        </el-tab-pane>

      </el-tabs>
    </panle>

    <panle title="排水SCADA数据监测">
      <el-tabs v-model="drainData.activeName">


        <el-tab-pane label="排水流量监控" name="first">
          <el-table :data="drainData.pumpFluxData" style="width: 100%" height="158">
            <el-table-column prop="name" label="站点名"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column label="当前值">
              <template slot-scope="scope">
                <span :class="{'alarm':scope.row.alarm}">{{ scope.row.value }}</span>
                <i class="arrows" :class="{'up':scope.row.hb=='up','down':scope.row.hb=='down'}"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>


        <el-tab-pane label="排水液位监测" name="second">
          <el-table :data="drainData.pressData" style="width: 100%" height="158">
            <el-table-column prop="name" label="站点名" style="white-space: nowrap;"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column label="当前值">
              <template slot-scope="scope">
                <span :class="{'alarm':scope.row.alarm}">{{ scope.row.value }}</span>
                <i class="arrows " :class="{'up':scope.row.hb=='up','down':scope.row.hb=='down'}"></i>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>



        <!--  <el-tab-pane label="泵站排水量监测" name="third">泵站排水量监测</el-tab-pane> -->
      </el-tabs>
    </panle>

    <panle title="施工热线信息">
      <el-tabs v-model="hotLineRoadWorkData.activeName">
        <el-tab-pane label="热线信息" name="first">
          <el-table :data="hotLineRoadWorkData.hotLineData.slice(0, 5)" style="width: 100%" height="158">
            <el-table-column prop="gdh" label="工单号"></el-table-column>
            <el-table-column prop="sdate" label="时间"></el-table-column>
            <el-table-column prop="fylb" label="类型"></el-table-column>
            <el-table-column prop="zrbm" label="责任部门"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="施工信息" name="second">
          <el-table :data="hotLineRoadWorkData.roadWorkData" style="width: 100%" height="158">
            <el-table-column prop="sdate" label="时间"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column prop="desc" label="描述"></el-table-column>
          </el-table>
        </el-tab-pane>

      </el-tabs>
    </panle>

    <panle title="重点用户列表">
      <el-tabs v-model="vipData.activeName">
        <el-tab-pane label="重点用水户监测" name="first">
          <el-table :data="vipData.useWaterData" style="width: 100%" height="188">
            <el-table-column prop="name" label="用户名称" style="white-space: nowrap;"></el-table-column>
            <el-table-column prop="jrlj" label="今日累计"></el-table-column>
            <el-table-column prop="zrlj" label="昨日累计"></el-table-column>
            <el-table-column prop="bylj" label="本月累计"></el-table-column>
          </el-table>
        </el-tab-pane>

           <el-tab-pane label="重点排水户监测" name="second">
          <el-table :data="vipData.drainWaterData" style="width: 100%" height="188">
            <el-table-column prop="name" label="用户名称"></el-table-column>
            <el-table-column prop="ssll" label="瞬时流量(m³/h)"></el-table-column>
            <el-table-column prop="jrll" label="今日累计"></el-table-column>
            <el-table-column prop="byll" label="本月累计"></el-table-column>
          </el-table>
        </el-tab-pane>


        <!-- <el-tab-pane label="重点排水户监测" name="second">重点排水户监测</el-tab-pane> -->
      </el-tabs>
    </panle>
  </div>
</template>
<script>
import panle from '../components/panle.vue'
import { API } from '../modules/service.js'
const pressData = function() {
    let data = []
    for (let i = 0; i < 5; i++) {
        data.push({
            name: '监测点1',
            time: '14:18:23',
            value: 0.7,
            hb: 'up',
            alarm: true
        })
    }
    return data
}

const hotLineData = function() {
    let data = []
    for (let i = 0; i < 5; i++) {
        data.push({
            type: '爆管',
            time: '14:18:23',
            state: '未处理',
            desc: '嘉园小区爆管'
        })
    }
    return data
}
const useWaterData = function() {
    let data = []
    for (let i = 0; i < 5; i++) {
        data.push({ name: '刘先生', ssll: 776, jrlj: 3265, bylj: 65231 })
    }
    return data
}

export default {
    components: { panle },
    props: {},
    data() {
        return {
            applyData: {
                activeName: 'first',
                pressData: pressData(),
                dyhData: [],
                areaWaterData: [],
                waterQualityData: []
            },
            drainData: {
                activeName: 'first',
                pressData: pressData(),
                WaterPurificationData: [],
                pumpFluxData: []
            },
            hotLineRoadWorkData: {
                activeName: 'first',
                hotLineData: hotLineData(),
                roadWorkData: []
            },
            vipData: {
                activeName: 'first',
                useWaterData: useWaterData(),
                drainWaterData: []
            }
        }
    },
    created() {},
    mounted() {
        this.freshData()
    },
    computed: {},
    methods: {
        freshData() {
            this.getSdata()
            this.getEventData()
            this.getBiguserData()
            setTimeout(this.freshData, 600000)
        },
      getBiguserData:function(){
        let self=this;

            let today = new Date()
            let n_now = today.getTime() / 1000
            let month = new Date((today.getTime() / 1000) * 1000).FormatString(
                'yyyy-MM-01'
            )
            let n_month = month.GetTime()
            let td=new Date(today.getTime() / 1000 * 1000).FormatString("yyyy-MM-dd");
            let n_today=td.GetTime()
            let n_yesterday=n_today-24*3600;

  
          let gs = { prefix: 'sxgs', Token: '57938fae42de38519530128f' }
          let gsBiguser=[]
          $.when(
            API.geStationDetail(Object.assign({},gs,{"Dtypes":["SJLJ"],"StationId":"DB14","Begin":n_month,"End":n_now,"Interval":86400,"All":true})),
            API.geStationDetail(Object.assign({},gs,{"Dtypes":["SJLJ"],"StationId":"DB32","Begin":n_month,"End":n_now,"Interval":86400,"All":true})),
            API.geStationDetail(Object.assign({},gs,{"Dtypes":["SJLJ"],"StationId":"DB9","Begin":n_month,"End":n_now,"Interval":86400,"All":true})),
            API.geStationDetail(Object.assign({},gs,{"Dtypes":["SJLJ"],"StationId":"55cc645842de38543fe277f3","Begin":n_month,"End":n_now,"Interval":86400,"All":true})),
            API.geStationDetail(Object.assign({},gs,{"Dtypes":["SJLJ"],"StationId":"55cc66a842de38543fe27829","Begin":n_month,"End":n_now,"Interval":86400,"All":true})),
            API.geStationDetail(Object.assign({},gs,{"Dtypes":["SJLJ"],"StationId":"DB275","Begin":n_month,"End":n_now,"Interval":86400,"All":true}))
          ).done(function(r1,r2,r3,r4,r5,r6){

// name ssll jrlj bylj
        
            $.each([r1,r2,r3,r4,r5,r6],function(aai,aav){
              let o1={"bylj":0}
                  o1["name"]=aav.Station.Name
              $.each(aav.Sensors[0]["Vals"],function(a2i,a2v){
                 let dd=a2v.Report;
                     dd=dd.lastv-dd.firstv;
                     o1["bylj"]+=dd
                     
                      if(a2v.Time==n_today){
                       o1["jrlj"]=dd
                     }
                      if(a2v.Time==n_yesterday){
                       o1["zrlj"]=dd
                     }

              })
              gsBiguser.push(o1)
             
            })

            self.vipData.useWaterData=gsBiguser;

          })


    

      },
        getEventData() {
            let self = this
            let gs = { prefix: 'sxgs', Token: '57938fae42de38519530128f' }
            let today = new Date()
            let n_now = today.getTime() / 1000
            let year = new Date((today.getTime() / 1000) * 1000).FormatString(
                'yyyy-01-01'
            )
            let n_year = year.GetTime()

            API.getHotLine(
                Object.assign({}, gs, {
                    etime:"2018-11-07 23:59:59",
                    gd_bh:"",
                    node_id:null,
                    page:1,
                    stime:"2018-11-01",
                    size: 5,
                    order: [{ Field: 'created', Type: true }],
                })
            ).done(function(r) {
                if (r) {
                    if (r.gd_info.length > 0) {
                        $.each(r.gd_info, function(ri, rv) {
                            rv['sdate'] = rv.xdsj.split(' ')[1]
                        })
                        self['hotLineRoadWorkData'].hotLineData = r.gd_info
                    }
                }
            })

            API.getScadaEvent(
                Object.assign({}, gs, {
                    query: {
                        created: { $gte: n_year },
                        cid: '5514076f42de3814dd180529',
                        type: { $in: ['cx', 'ts'] }
                    },
                    order: [{ Field: 'created', Type: true }],
                    size: 5,
                    index: 1
                })
            ).done(function(r) {
                if (r) {
                    
                    if (r.rows.length > 0) {
                        $.each(r.rows, function(ri, rv) {
                            // 时间 类型 状态 描述

                            rv['sdate'] = new Date(
                                rv.created * 1000
                            ).FormatString('HH:mm:ss')
                            if (rv.type == 'ts') {
                                // 描述
                                if (rv.shfm_jssj >= n_now) {
                                    rv['state'] = '未完成'
                                } else {
                                    rv['state'] = '已完成'
                                }
                                rv['type'] = '停水'
                                rv['desc'] = rv.gd_tslbnm
                            } else {
                                if (rv.sh_jssj >= n_now) {
                                    rv['state'] = '未完成'
                                } else {
                                    rv['state'] = '已完成'
                                }

                                rv['type'] = '冲洗'
                                rv['desc'] = rv.sq_cxsy
                            }
                        })
                        self['hotLineRoadWorkData'].roadWorkData = r.rows
                    }
                }
            })
        },
        getSdata() {
            let self = this

            let gs = { prefix: 'sxgs', Token: '57938fae42de38519530128f' }
            let ps = { prefix: 'sxps', Token: '5bc7f401e138234b9d804891' }

            let q1 = {
                Stations: [
                    'JCD13',
                    '55ed2dd642de381717cbc46e',
                    'JCD44',
                    '55ed32d842de381717cbc4a7',
                    '58e8a4d842de38198b0fe8a0'
                ],
                DTypes: ['YL'],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }

            let q = Object.assign({}, gs, q1)
           self.getData(q, 'gs_pressData')

            // 区域水量
            q1 = {
                Stations: [
                    '400013346',
                    '400013350',
                    '400013351',
                    '400013352',
                    '400013362'
                ],
                DTypes: ['SSLL'],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }
            q = Object.assign({}, gs, q1)
            self.getData(q, 'gs_areaWaterData')

            q1 = {
                Stations: [
                    'JCD35',
                    'JCD16',
                    'JCD49',
                    '589582a242de380bbd7a9f9d',
                    '58e8a4d842de38198b0fe8a0'
                ],
                DTypes: ['PH', 'YuL', 'ZD'],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }

            q = Object.assign({}, gs, q1)
           self.getData(q, 'gs_waterQualityData')
// 供水大用户

          // q1 = {
          //       Stations: [
          //           "DB14",
          //           "DB32",
          //           "DB9",
          //           "55cc645842de38543fe277f3",
          //           "55cc66a842de38543fe27829 ",
          //           "DB275",
          //       ],
          //       DTypes: [ "SJLJ" ],
          //       Favorited: false,
          //       From: 0,
          //       Size: 99999,
          //       Sort: -1,
          //       AType: null
          //   }

          //   q = Object.assign({}, gs, q1)
          //   
          //   self.getData(q, 'gs_useWaterData')


            

// 排水大用户
          q1 = {
                Stations: [
                    "5b865749e1382371dd4a406e",
                    "5b05103da3d24b08a0cd1776",
                    "595204faa3d24bfaf1538260",
                    "59520203a3d24bfaf153820a",
                    // "5b6a3dc92f58ae133022ad99",
                    "595206d6a3d24bfaf153829e",
                ],
                DTypes: [ "SSLL", "JRLL", "BYLL" ],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }

            q = Object.assign({}, ps, q1)
           self.getData(q, 'ps_drainWaterData')



            //   排水 压力(液位)
            q1 = {
                Stations: [
                
               
                  "59101f5b97da6f3438dcb92d",
                  "59101fb897da6f3438dcb93d",

                  "59101fd997da6f3438dcb945",
                  "591021c697da6f3438dcb99e",
                  "59101fac97da6f3438dcb93b",
                ],
                DTypes: ['YW'],
                Favorited: false,
                From: 0,
                Size: 5,
                Sort: -1,
                AType: null
            }

            q = Object.assign({}, ps, q1)
            self.getData(q, 'ps_pressData')
            //   排水 流量
            q1 = {
                Stations: [
                  "5951ffdda3d24bfaf15381c4",
                //   "5951ffe3a3d24bfaf15381c5",
                //   "591020bd97da6f3438dcb972",

                  "5951ffafa3d24bfaf15381c0",
                  "59520249a3d24bfaf1538217",

                  "59101f5197da6f3438dcb92b",
                  "59101fb897da6f3438dcb93d",
                ],
                DTypes: ['SSLL'],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }

            q = Object.assign({}, ps, q1)
            self.getData(q, 'ps_pumpFluxData')
 
        },

        getData: function(query, tp) {
            let self = this

            let today = new Date()
            let n_now = today.getTime() / 1000
            let td = new Date((today.getTime() / 1000) * 1000).FormatString(
                'yyyy-MM-dd'
            )
            let n_today = td.GetTime()
            let n_lastMonth = n_today - 30 * 24 * 3600
            // 供水

            let data_a = []

            API.getStationList(query).done(function(r) {
                if (r.Data.length > 0) {
                    $.each(r.Data, function(ri, rv) {
                        let one = {}
                        one['name'] = rv['Station']['Name']
                        one['time'] = rv['Station'].Time
                        $.each(rv.Sensors, function(si, sv) {
                            if (sv.AlarmType) {
                                one['alarm'] = true
                                if (sv.Ref) {
                                    if (sv.Ref > sv.Value) {
                                        one['hb'] = 'up'
                                    } else {
                                        one['hb'] = 'down'
                                    }
                                }
                            }
                            one['value'] = sv.Value

                            // one['hb'] = 'up'

                            if (sv.DType == 'YuL') {
                                one['yul'] = sv.Value
                            }
                            if (sv.DType == 'ZD') {
                                one['zd'] = sv.Value
                            }
                            if (sv.DType == 'PH') {
                                one['ph'] = sv.Value
                            }
                             if (sv.DType == 'SSLL') {
                                one['ssll'] = sv.Value
                            }
                             if (sv.DType == 'JRLL') {
                                one['jrll'] = sv.Value
                            }
                             if (sv.DType == 'BYLL') {
                                one['byll'] = sv.Value
                            }
                        })
                        data_a.push(one)
                    })
                    if (tp == 'gs_pressData') {
                        self.applyData['pressData'] = data_a
                    } else if (tp == 'gs_areaWaterData') {
                        self.applyData['areaWaterData'] = data_a
                    } else if (tp == 'gs_waterQualityData') {
                        self.applyData['waterQualityData'] = data_a
                    } else if (tp == 'ps_pressData') {
                        self.drainData['pressData'] = data_a
                    } else if (tp == 'ps_pumpFluxData') {
                        self.drainData['pumpFluxData'] = data_a
                    }else if (tp == 'ps_drainWaterData') {
                        self.vipData['drainWaterData'] = data_a
                    }else if (tp == 'gs_useWaterData') {
                        self.vipData['useWaterData'] = data_a
                    }
                }
            })
        },

        rowStyle(obj) {
            if (obj.row.alarm) {
                return {
                    'background-color': '#F03939',
                    'border-radius': '4px'
                }
            }
        }
    },
    watch: {}
}
</script>
<style lang="less">
@red: #f03939;
.part-right {
    width: 23%;
    float: left;
    height: 100%;
    color: white;
    box-sizing: border-box;
    border-left: 1px solid #4a4b4b;
    .el-table {
        &:before {
            display: none;
        }
        .cell{
                white-space: nowrap!important;
        }
        .el-table__header-wrapper {
            thead {
                th {
                    background-color: #000;
                    padding: 5px 0;
                    border: none;
                    font-size: 12px;
                    &.is-leaf {
                        border: none;
                    }
                }
            }
        }
        .el-table__body-wrapper {
            background-color: #000;
            .el-table__row {
                color: white;
                background-color: #000;
                &:nth-child(odd) {
                    background-color: #111213;
                }
                td {
                    padding: 1px 0;
                    border: none;
                    .alarm {
                        background-color: @red;
                        padding: 0 8px;
                        border-radius: 3px;
                    }
                    .arrows {
                        display: inline-block;
                        width: 6px;
                        height: 14px;
                        margin-left: 15px;
                        &.up {
                            background: url(/static/images/icon/arrows-up.png);
                        }
                        &.down {
                            background: url(/static/images/icon/arrows-down.png);
                        }
                    }
                }
            }
        }
    }
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #212e3e !important;
}
</style>