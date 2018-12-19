<template>
      <div class="part-left">
        <panle title="供水水量预测">
          <forecast-chart :forecast-data="gsData" v-if="gsData.isLoad"></forecast-chart>
        </panle>
        <panle title="排水水量预测">
          <forecast-chart :forecast-data="psData" v-if="psData.isLoad"></forecast-chart>
        </panle>
        <panle title="异常事件列表" v-if="theme == 'check'">
          <div class="error-list">
            <table cellspacing="0" cellpadding="0" border="0" class="error-list-table-head">
              <tr class="head">
                <td width="15%">&nbsp;</td>
                <td width="30%">位置</td>
                <td width="20%">时间</td>
                <td width="18%">漏失水量</td>
                <td width="10%"></td>
                <td></td>
              </tr>
            </table>
            <div v-bar style="height: 370px">
            <div class="error-list-content">
              <table cellspacing="0" cellpadding="0" border="0">
                <tr v-for="(error, i) in errorList" :key="i">
                  <td width="15%">
                    <span class="event-type">供</span>
                  </td>
                  <td class="area-name" :title="error.AreaName" width="30%"><span>{{error.AreaName}}</span></td>
                  <td width="20%">{{error.HappenTime.split(' ')[1]}}</td>
                  <td width="18%">{{error.leakage}}</td>
                  <td width="10%">
                    <i class="error-icon" :class="'icon-'+{'1':'shigong','2':'louye','3':'baoguan'}[error.Grade]"></i>
                  </td>
                  <td>
                    <i class="icon-error" :class="{'1':'blue','2':'yellow','3':'red'}[error.Grade]"></i>
                  </td>
                </tr>
              </table>
              </div>
            </div>
          </div>
        </panle>

        <template v-if="theme == 'applypump'">
          <panle title="供水基础设施概况">
            <el-tabs v-model="gsData.activeName">
                <el-tab-pane label="管道长度" name="first">
                  <bar-chart :chart-data="gsData.pipeData" :formatter-unit="true"></bar-chart>
                </el-tab-pane>
                <el-tab-pane label="阀门" name="second">
                  <bar-chart :chart-data="gsData.fmData" v-if="gsData.activeName == 'second'"></bar-chart>
                </el-tab-pane>
                <el-tab-pane label="消防栓" name="third">
                  <bar-chart :chart-data="gsData.xfsData" v-if="gsData.activeName == 'third'"></bar-chart>
                </el-tab-pane>
            </el-tabs>
          </panle>
          <panle title="排水基础设施概况">
            <el-tabs v-model="psData.activeName">
                <el-tab-pane label="管道长度" name="first">
                  <hill-chart :chart-data="psData.pipeData" :formatter-unit="true"></hill-chart>
                </el-tab-pane>
                <el-tab-pane label="泵站" name="second">
                  <hill-chart :chart-data="psData.bzData" v-if="psData.activeName == 'second'"></hill-chart>
                </el-tab-pane>
            </el-tabs>
          </panle>
        </template>
      </div>
</template>

<script>
import panle from '../components/panle.vue'
import ForecastChart from '../components/forecastChart.vue'
import {API} from "../modules/service.js"
import BarChart from '../components/barChart.vue'
import HillChart from '../components/hillChart.vue'
const randomData = function(index){
  let data = []
  for(let i = 0;i < 10; i++){
    data.push({Time: index+''+i, Val: Math.random()*20})
  }
  return data
}

export default {
  components:{ panle, ForecastChart, BarChart, HillChart },
  props: {
    theme: String
  },
  data(){
    return {
      // 供水数据
      gsData: {
        summarization: [
          {name: '当前瞬时供水量',unit: 'm³/h',value: 36254.20},
          {name: '今日累计供水量',unit: 'm³',value: 36254.20},
        ],
        history: [],
        forecast: [],
        isLoad: false,

        activeName: 'first',
        pipeData: [
          {name: '城东', value: 650838},
          {name: '镜湖', value: 369676},
          {name: '城南', value: 567256},
          {name: '袍江', value: 1006126},
          {name: '越城', value: 1301233},
        ],
        fmData: [
          {name: '越城', value: 23431},
          {name: '袍江', value: 9647},
          {name: '城东', value: 5423},
          {name: '城南', value: 7256},
          {name: '镜湖', value: 3197},
        ],
        xfsData: [
          {name: '越城', value: 2605},
          {name: '袍江', value: 1055},
          {name: '城东', value: 570},
          {name: '城南', value: 810},
          {name: '镜湖', value: 555},
        ]
      },

      // 排水数据
      psData: {
        summarization: [
          {name: '当前瞬时进水量',unit: 'm³/h',value: 36254.20},
          {name: '今日累计进水量',unit: 'm³',value: 36254.20},
        ],
        history: [],
        forecast:[],

        activeName: 'first',
        pipeData: [
          {name: '越城', value: 102233},
          {name: '袍江', value: 231307},
          {name: '城东', value: 116618},
          {name: '镜湖', value: 291735},
        ],
        bzData: [
          {name: '越城', value: 10.5},
          {name: '袍江', value: 7.5},
          {name: '城东', value: 1.2},
          {name: '城南', value: 2.8},
          {name: '镜湖', value: 1.3},
        ]
      },
      errorList: []
    }
  },
  created() {},
  mounted() {
    this.freshData()
    if(this.theme == 'check')
      this.fetchErrorData()
  },
  watch: {
    theme(val){
      if(val == 'check')
        this.fetchErrorData()
    }
  },
  computed:{},
  methods: {
    freshData(){
      this.getData()
      setTimeout(this.freshData, 60000)
    },
     getData:function(){
       let self=this;
       let gs={"prefix":"sxgs","Token":"57938fae42de38519530128f"}
       let ps={"prefix":"sxps","Token":"5bc7f401e138234b9d804891"}
       let bi={"prefix":"sxbi"}

  let today=new Date();
  let n_now=today.getTime() / 1000
  let td=new Date(today.getTime() / 1000 * 1000).FormatString("yyyy-MM-dd");
  let n_today=td.GetTime()
  let n_lastMonth=n_today-30*24*3600;
// 供水
      let  gsq={"Ids":["DV_13341_A1"],"Begin":n_today*1000,"End":n_now*1000,"Interval":3600};
      let  biq={"Forecast_day":1,"History_window":[],"Point_count_1_day":24}
      API.getAlarmData(Object.assign({},gs,{"Ids":["DV_13341_A1"]})).done(function(real){
       if (real.length>0){
           $.each(real,function(reali,realv){
             
                self["gsData"]["summarization"][1]["value"]=realv.Value;
           })
        }
      })

       API.geStationDetail(Object.assign({},gs,{"Sid":["DV_13341_P1"],"StationId":"400013341","Begin":n_today,"End":n_now,"Interval":86400,"All":true})).done(function(r){
       if (r){
          let daily=r.Sensors[0]["Vals"][0].Report;
          
           self["gsData"]["summarization"][1]["value"]=daily.lastv-daily.firstv;
        }
      })


      

    API.geSensorHistory(Object.assign({},gs,gsq)).done(function(r){
           if(r.length>0){
        gsq["Begin"]=n_lastMonth*1000;
        API.geSensorHistory(Object.assign({},gs,gsq)).done(function(r2){
          if(r2.length>0){
           
            $.each(r2[0].Vals,function(r2i,r2v){
               biq["History_window"].push(r2v.Val);
            })
            
            API.geForecast(Object.assign({},bi,biq)).done(function(r3){
              let forcastData=[]
              $.each(r3,function(r3i,r3v){
                  forcastData.push({"Time":n_today+r3i*3600,"Val":parseFloat(r3v)});
              })
              
              self["gsData"]["history"]=r[0].Vals;  
              self["gsData"]["forecast"]=forcastData  
              self["gsData"].isLoad = true;        
            })
          }
           
        }) 
      }

       })

// 排水
  API.gePumpGeneral(
    { "Token":"5bc7f401e138234b9d804891",
    "lsids":["QYJL_2017001_VSS", "QYJL_2017001_VSJ"], "ssids":["QYJL_2017001_VSS", "QYJL_2017001_VJR", "QYJL_2017001_VBY"]})
    .done(function(r){
      
      self.psData.summarization[0].value=r.items.ssll.value
      self.psData.summarization[1].value=r.items.jrll.value
    })

 let  psq={"Ids":["QYJL_2017001_VSS"],"Begin":n_today*1000,"End":n_now*1000,"Interval":3600};
        API.geSensorHistory(Object.assign({},ps,psq)).done(function(r){
           if(r.length>0){
        psq["Begin"]=n_lastMonth*1000;
        API.geSensorHistory(Object.assign({},ps,psq)).done(function(r2){
          if(r2.length>0){
           
            $.each(r2[0].Vals,function(r2i,r2v){
               biq["History_window"].push(r2v.Val);
            })
            API.geForecast(Object.assign({},bi,biq)).done(function(r3){
              let forcastData=[]
              $.each(r3,function(r3i,r3v){
                  forcastData.push({"Time":n_today+r3i*3600,"Val":parseFloat(r3v)});
              })
              
              self["psData"]["history"]=r[0].Vals;  
              self["psData"]["forecast"]=forcastData  
              self["psData"].isLoad = true;        
            })
          }
           
        }) 
      }

       })



     },
     fetchErrorData() {
       let self = this
       API.getErrorData({"prefix":"sxbi",TimeSta:'2018-10-23 02:28:00'}).done(R => {
         self.errorList = R.RData
       })
     }
  },
};
</script>
<style lang="less" >
@purple: #A335EE;
@blue: #558BE8;
.part-left{
    width: 23%;
    height: 100%;
    float: left;
    color: white;
    border-right: 1px solid #4A4B4B;
    box-sizing: border-box;
    z-index: 3;
    background-color: rgba(41,46,51,0.4);
    .error-list{
      .error-list-table-head{
        width: 100%;
        .head{
          color: #747474;
        }
      }
      .error-list-content{
        table{
          width: 100%;
          .event-type{
            background-color: @blue;
            padding: 0 10px;
            padding-right: 15px; 
            position: relative;
            line-height: 16px;
            height: 17px;
            display: inline-block; 
            &:after{
              display: inline-block;
              content: '';
              width:0;
              height:0;
              border-style:solid;
              border-width:8px 0 9px 8px;
              border-color:transparent transparent transparent @blue;
              position: absolute;
              right: -8px;
            }
            &:before{
              display: inline-block;
              content: '';
              width: 4px;
              height: 4px;
              background-color: white;
              position: absolute;
              right: 0px;
              top: 50%;
              transform: translateY(-50%)
            }
          }
          tr{
            td{
              padding: 5px 0;
              &.area-name{
                // width: 200px;
                span{
                  width: 100px;
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
                  display: inline-block;
                }
              }
            }
            &:nth-child(odd){
              background: linear-gradient(to right, #080808 , #202126);
            }
          }
        }
      }
      .error-icon{
        display: inline-block;
        width: 27px;
        height: 16px;
        &.icon-baoguan{
          background: url(/static/images/icon/baoguan.png);
        }
        &.icon-louye{
          background: url(/static/images/icon/louye.png);
        }
        &.icon-shigong{
          background: url(/static/images/icon/shigong.png);
        }
      }
      .icon-error{
        display: inline-block;
        width: 18px;
        height: 18px;
        font-style: normal;
        border-radius: 50%;
        text-align: center;
        &:after{
          content: '!';
          position: relative;
          top: -2px;
        }
        &.red{
          background-color: #AB1717;
        }
        &.yellow{
          background-color: #B28D1B;
        }
        &.blue{
          background-color: #198E9D;
        }
      }
    }
    .pipe-chart{
      height: 150px;
    }
}
</style>