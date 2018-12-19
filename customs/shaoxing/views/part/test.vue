<template>
  <div class="part-right">
    <panle title="供水SCADA数据监测">
      <el-tabs v-model="applyData.activeName">
        <el-tab-pane label="供水压力监测" name="first">
          <el-table :data="applyData.pressData" style="width: 100%">
            <el-table-column prop="name" label="站点名"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column label="当前值">
              <template slot-scope="scope">
                <span :class="{'alarm':scope.row.alarm}">{{ scope.row.value }}</span>
                <i class="arrows up"></i>
              </template>
            </el-table-column>
        </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane label="大用户水量监测" name="second">大用户水量监测</el-tab-pane> -->
        
        
            <el-tab-pane label="区域水量监测" name="third">
                    <el-table :data="applyData.areaWaterData" style="width: 100%">
                        <el-table-column prop="name" label="站点名"></el-table-column>
                        <el-table-column prop="time" label="时间"></el-table-column>
                        <el-table-column label="当前值">
                            <template slot-scope="scope">
                                <span :class="{'alarm':scope.row.alarm}">{{ scope.row.value }}</span>
                                <i class="arrows up"></i>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-tab-pane>
                <el-tab-pane label="水质监测" name="fourth">

                    <el-table :data="applyData.waterQualityData" style="width: 100%">
                        <el-table-column prop="name" label="站点名"></el-table-column>
                        <el-table-column prop="time" label="时间"></el-table-column>
                        <el-table-column prop="yul" label="余氯"></el-table-column>
                        <el-table-column prop="ph" label="PH"></el-table-column>

                    </el-table>

                </el-tab-pane>

      </el-tabs>
    </panle>

    <panle title="排水SCADA数据监测">
      <el-tabs v-model="drainData.activeName">
        <el-tab-pane label="排水压力监测" name="first">
          <el-table :data="drainData.yaliData" style="width: 100%" :row-style="rowStyle">
            <el-table-column prop="name" label="站点名"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
             <el-table-column label="当前值">
                            <template slot-scope="scope">
                                <span :class="{'alarm':scope.row.alarm}">{{ scope.row.value }}</span>
                                <i class="arrows"></i>
                            </template>
             </el-table-column>

          </el-table>
        </el-tab-pane>

       <el-tab-pane label="排水流量监测" name="second">
          <el-table :data="drainData.fluxData" style="width: 100%" :row-style="rowStyle">

            <el-table-column prop="name" label="站点名"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column label="当前值">
                            <template slot-scope="scope">
                                <span :class="{'alarm':scope.row.alarm}">{{ scope.row.value }}</span>
                                <i class="arrows"></i>
                            </template>
             </el-table-column>
           

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="泵站排水量监测" name="third">泵站排水量监测</el-tab-pane>
      </el-tabs>
    </panle>

    <panle title="施工热线信息">
      <el-tabs v-model="hotLineRoadWorkData.activeName">
        <el-tab-pane label="热线信息" name="first">
          <el-table :data="hotLineRoadWorkData.hotLineData" style="width: 100%">
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column prop="desc" label="描述"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="施工信息" name="second">施工信息</el-tab-pane>
      </el-tabs>
    </panle>

    <panle title="重点用户列表">
      <el-tabs v-model="vipData.activeName">
        <el-tab-pane label="重点用水户监测" name="first">
          <el-table :data="vipData.useWaterData" style="width: 100%">
            <el-table-column prop="name" label="用户名称"></el-table-column>
            <el-table-column prop="ssll" label="瞬时流量(m³/h)"></el-table-column>
            <el-table-column prop="jrlj" label="今日累计"></el-table-column>
            <el-table-column prop="bylj" label="本月累计"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="重点排水户监测" name="second">重点排水户监测</el-tab-pane>
      </el-tabs>
    </panle>
  </div>
</template>
<script>
import panle from '../components/panle.vue'
import { API } from '../modules/service.js'
const pressData = function(){
  let data = []
  for(let i = 0; i < 5; i++){
    data.push({name: '监测点1', time: '14:18:23', value: 0.7, hb: 'up', alarm: true})
  }
  return data
}
const yaliData = function() {
  let data = []
  for(let i = 0; i < 4; i++){
    data.push({name: '监测点1', curValue: 2.3, maxValue: 2.7, alarm: false})
  }
  data.push({name: '监测点1', curValue: 2.3, maxValue: 2.7, alarm: true})
  return data
}
const hotLineData = function() {
  let data = []
  for(let i = 0; i < 5; i++){
    data.push({type: '爆管', time: '14:18:23', state: '未处理', desc: '嘉园小区爆管'})
  }
  return data
}
const useWaterData = function() {
  let data = []
  for(let i = 0; i < 5; i++){
    data.push({name: '刘先生', ssll: 776, jrlj: 3265, bylj: 65231})
  }
  return data
}

export default {
  components:{ panle },
  props: {},
  data(){
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
        yaliData: yaliData(),
        WaterPurificationData: [],
        pumpData: []
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
    let self = this
        self.getSdata();
  },
  computed:{},
  methods: {

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
            self.getData(q,"gs_pressData")

            // 区域水量
            q1 = {
                Stations: [
                    '400013346', '400013350', '400013351', '400013352', '400013362'
                ],
                DTypes: ['SSLL'],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }
            q = Object.assign({}, gs, q1)
            self.getData(q,"gs_areaWaterData")

            q1 = {
                Stations: [
                    'JCD35', 'JCD16', 'JCD49', '589582a242de380bbd7a9f9d', '58e8a4d842de38198b0fe8a0'
                ],
                DTypes: ['PH', 'YuL', 'ZD'],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }

            q = Object.assign({}, gs, q1)
             self.getData(q,"gs_waterQualityData")

            //   排水 压力
            q1 = {
                Stations: [
                    '59101e9f97da6f3438dcb870', '59101eab97da6f3438dcb87e', '59520249a3d24bfaf1538217', '5910212297da6f3438dcb982'
                ],
                DTypes: ['YL'],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }

            q = Object.assign({}, ps, q1)
            self.getData(q, 'ps_yaliData')
// 排水流量
             q1 = {
                Stations: [
                    "5951ffdda3d24bfaf15381c4",
                    "5951ffe3a3d24bfaf15381c5",
                    "591020bd97da6f3438dcb972",
                    "5951ffafa3d24bfaf15381c0",
                    "59520249a3d24bfaf1538217",
                ],
                DTypes: ['SSLL'],
                Favorited: false,
                From: 0,
                Size: 99999,
                Sort: -1,
                AType: null
            }

            q = Object.assign({}, ps, q1)
            self.getData(q, 'ps_fluxData')





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


          if(tp=="gs_rexian"){
            // {type: '爆管', time: '14:18:23', state: '未处理', desc: '嘉园小区爆管'}
            API.getScadaEvent(query).done(function(r){
              if(r.rows){
                $.each(r2,function(r2i,r2v){
                 one= {type: '爆管', time: '14:18:23', state: '未处理', desc: '嘉园小区爆管'}
                 data_a.push(one)
                })

                 if(tp == 'gs_rexian') {
                        self.hotLineRoadWorkData['hotLineData'] = data_a
                    }else{
                         self.hotLineRoadWorkData['roadWorkData'] = data_a
                    }
              }
            })
          }else{



            API.getStationList(query).done(function(r) {
                if (r.Data.length > 0) {
                    $.each(r.Data, function(ri, rv) {
                        let one = {}
                        one['name'] = rv['Station']['Name']
                        one['time'] = rv['Station'].Time

                        $.each(rv.Sensors, function(si, sv) {
                            if (sv.AlarmType) {
                                one['alarm'] = true
                            }
                            one['value'] = sv.Value
                            one['hb'] = ''

                            if (sv.DType == 'YuL') {
                                one['yul'] = sv.Value
                            }
                            if (sv.DType == 'PH') {
                                one['ph'] = sv.Value
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
                    } else if (tp == 'ps_yaliData') {
                        self.drainData['yaliData'] = data_a
                    } else if (tp == 'ps_fluxData') {
                        self.drainData['fluxData'] = data_a
                    }
                }
            })}
        },

    rowStyle(obj) {
      if(obj.row.alarm){
        return {
          'background-color': '#F03939',
          'border-radius':'4px',
        }
      }
    }
  },
  watch: {},
};
</script>
<style lang="less">
@red: #F03939;
.part-right{
    width: 23%;
    float: left;
    height: 100%;
    color: white;
    .el-table{
      &:before{
        display: none;
      }
      .el-table__header-wrapper{
        thead{
          th{
            background-color: #000;
            padding: 5px 0;
            border: none;
            &.is-leaf{
              border: none;
            }
          }
        }
        
      }
      .el-table__row{
        color: white;
        background-color: #000;
        &:nth-child(odd){
          background-color:  #111213;
        }
        td{
          padding: 1px 0;
          border: none;
          .alarm{
            background-color: @red;
            padding: 0 8px;
            border-radius: 3px;
          }
          .arrows{
            display: inline-block;
            width: 6px;
            height: 14px;
            margin-left: 15px;
            &.up{
              background: url(/static/images/icon/arrows-up.png);
            }
            &.down{
              background: url(/static/images/icon/arrows-down.png);
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