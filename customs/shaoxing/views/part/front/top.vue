<template>
      <div class="front-top" :style="{'pointer-events':theme=='check'?'auto':'none'}">
          <div v-if="theme=='check'">
              <panle title="视频监控">
                <el-row :gutter="10" type="flex" justify="space-evenly" style="margin-top: 10px;">
                    <el-col :span="4" v-for="chid in camerasData.chid" :key="chid" style="position: relative;    top: -4px;">
                        <iframe class="video" :src="'http://61.175.245.204:1111/static/dvr/video1.html?autoplay=1&dlg=1&ip=ip&port=port&account=acc&password=pwd&type=rtsp_h264&channel='+chid" width="100%" height="103px;"
                        frameborder="0"></iframe>
                        <div class="click-layer" @click="videoClick(chid)"></div>
                    </el-col>
                </el-row>

                
            </panle>
          </div>
          <div v-if="theme=='applypump'">
              <div class="icon-wrapper" style="padding-top:30px;background: rgba(0, 0, 0, 0.0)">
                  <div class="sg-icon">
                      <div style="float:left;margin-left:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                      <div style="float:right;margin-right:-2px;margin-top:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                      <div class="sg-pot">
                      </div>
                      <div class="sg-text">
                          当日热线
                      </div>
                      <div class="sg-num">
                          {{gd.tadayHotLine}}
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
                          当月热线
                      </div>
                      <div class="sg-num">
                              {{gd.monthHotLine}}
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
                          当年热线
                      </div>
                      <div class="sg-num">
                           {{gd.yearHotLine}}
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
                          当日工单
                      </div>
                      <div class="sg-num">
                            {{gd.todayWorkOrder}}
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
                          当月工单
                      </div>
                      <div class="sg-num">
                            {{gd.monthWorkOrder}}
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
                          当年工单
                      </div>
                      <div class="sg-num">
                            {{gd.yearWorkOrder}}
                      </div>
                      <div class="clear">
                          <div style="float:left;margin-left:-2px;border-top:solid 2px #01cef6;border-radius:5px;width:16px"></div>
                          <div style="float:right;margin-right:-2px;border-top:solid 2px #01cef6;width:16px"></div>
                      </div>
                  </div>
              </div>
          </div>
        
        <el-dialog title="视频" :visible.sync="camerasData.dialogVideoVisible" :modal-append-to-body="false">
                <iframe :src="'http://61.175.245.204:1111/static/dvr/video.html?autoplay=1&dlg=1&ip=ip&port=port&account=acc&password=pwd&type=rtsp_h264&channel='+camerasData.currentChid" width="100%" height="500px;"
                frameborder="0"></iframe>
        </el-dialog>
      </div>
       
</template>

<script>
import panle from '../../components/panle.vue'
import {API} from "../../modules/service.js"
export default {
  props: {
      "theme":""
  },
  data(){
    return {
        gd:{
            tadayHotLine:0,
            monthHotLine:0,
            yearHotLine:0,
            todayWorkOrder:0,
            monthWorkOrder:0,
            yearWorkOrder:0
        },

        camerasData: {
            id: '5b90d6c1e138237386ac4135',
            currentChid: '',
            dialogVideoVisible: false,
            chid: [
                // '5b90d6fee138237386ac4136',
                // '5b90d799e138237386ac4137',
                // '5b9628e1e138237389da6913',
                // '5b96290be13823738c840143',
                // '5b962930e138237389da6914'
                'rtsp://140.80.3.2:554/pag://140.80.3.2:7302:33060200001310000018:0:MAIN:TCP?cnid=1&pnid=1&auth=50',
                'rtsp://140.80.3.2:554/pag://140.80.3.2:7302:33060200001310000017:0:MAIN:TCP?cnid=1&pnid=1&auth=50',
                'rtsp://140.80.3.2:554/pag://140.80.3.2:7302:33060200001310000012:0:MAIN:TCP?cnid=1&pnid=1&auth=50',
                'rtsp://140.80.3.2:554/pag://140.80.3.2:7302:33000000001310000008:0:MAIN:TCP?cnid=1&pnid=1&auth=50',
                'rtsp://140.80.3.2:554/pag://140.80.3.2:7302:11121321001310000001:0:MAIN:TCP?cnid=1&pnid=1&auth=50',
            ]
        },
    }
  },
  created() {},
  mounted() {
      let self=this;
      self.getData();
      //debugger
  },
  computed:{},
  methods: {
            getData:function(){
                let self=this;
                
        let today=new Date();
  let n_now=today.getTime() / 1000
  let td=new Date(today.getTime() / 1000 * 1000).FormatString("yyyy-MM-dd");
  let month=new Date(today.getTime() / 1000 * 1000).FormatString("yyyy-MM-01");
  let year=new Date(today.getTime() / 1000 * 1000).FormatString("yyyy-01-01");
  let n_today=td.GetTime();
  let n_month=month.GetTime();
  let n_year=year.GetTime();
 


       let gs={"prefix":"sxgs","Token":"57938fae42de38519530128f"}
       let ps={"prefix":"sxps","Token":"5bc7f401e138234b9d804891"}
//  热线
       API.getScadaEvent(Object.assign({},gs,{
           query:{
               created:{"$gte":n_today},
               "cid":"5514076f42de3814dd180529","type":"rx","permission":true},
           "size":1,"index":1
       })).done(function(r){
       if (r){
          self["gd"].tadayHotLine= r.total;
        }
      })

          API.getScadaEvent(Object.assign({},gs,{
           query:{
               created:{"$gte":n_month},"cid":"5514076f42de3814dd180529","type":"rx","permission":true},
           "size":1,"index":1
       })).done(function(r){
       if (r){
          self["gd"].monthHotLine= r.total;
        }
      })

        API.getScadaEvent(Object.assign({},gs,{
           query:{"cid":"5514076f42de3814dd180529","type":"rx",created:{"$gte":n_year}},
           "size":1,"index":1
       })).done(function(r){
       if (r){
          self["gd"].yearHotLine= r.total;
        }
      })
// 工单
      
       API.getScadaEvent(Object.assign({},gs,{
           query:{"cid":"5514076f42de3814dd180529","type":{'$in':["ts", "cx"]},created:{"$gte":n_today}},
           "size":1,"index":1
       })).done(function(r){
       if (r){
          self["gd"].tadayWorkOrder= r.total;
        }
      })

          API.getScadaEvent(Object.assign({},gs,{
           query:{"cid":"5514076f42de3814dd180529","type":{'$in':["ts", "cx"]},created:{"$gte":n_month}},
           "size":1,"index":1
       })).done(function(r){
       if (r){
          self["gd"].monthWorkOrder= r.total;
        }
      })

        API.getScadaEvent(Object.assign({},gs,{
           query:{"cid":"5514076f42de3814dd180529","type":{'$in':["ts", "cx"]},created:{"$gte":n_year}},
           "size":1,"index":1
       })).done(function(r){
       if (r){
          self["gd"].yearWorkOrder= r.total;
        }
      })




      },

      videoClick(chid) {
          this.camerasData.currentChid = chid
          this.camerasData.dialogVideoVisible = true
      }
  },
  watch: {},
  components:{
      panle
  }
};
</script>
<style lang="less" >
.front-top{
    position: absolute;
    z-index: 10001;
    // width: 100%;
    height: 120px;
    left: 23%;
    width:54%;
    // background-color: ;
    .panle{
        background: rgba(0,0,0,0.8);
        .panle-content{
            padding-top: 1px;
        }
    }
    .video{
        // border-color: #1E5662;
        // border-width: 1px;
        border: 1px solid #1E5662;
    }
    .click-layer{
        position: absolute;
        width: 100%;
        height: 103px;
        cursor: pointer;
        top: 0;
        &:before{
            display: inline-block;
            content: '';
            width: 8px;
            height: 8px;
            background-color: white;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -21px;
        }
    }
    .icon-wrapper{
        width: 546px;
        height: 146px;
        background: rgba(0,0,0,0.5);
        float: right;
        // margin-right: 30px;
        .sg-icon{
            // display: inline-block;
            float: left;
            width: 146px;
            height: 30px;
            border-radius: 0px;
            margin-top: 10px;
            margin-left: 28px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 12px;
            line-height: 30px;
            background-color: rgba(0,0,0,0.8);
            border-left: solid 2px #01cef6;
            border-right: solid 2px #01cef6;
            border-top:solid 1px #595a5a;
            border-bottom:solid 1px #595a5a;
            color: #e9e9e9;
            .sg-pot{
                margin-left: 4px;
                float: left;
                height: 4px;
                width: 4px;
                background: #e9e9e9;
                margin-top: 14px;
            }
            .sg-text{
                float: left;
                margin-left: 6px;
            }
            .sg-num{
                float: right;
                margin-right: 8px;
            }
            .clear{
                clear:both;
            }
        }
    }
    .is-justify-space-evenly{
        justify-content: space-evenly;
    }
    .el-dialog__wrapper{
        .el-dialog{
            .el-dialog__header{
                display: none;
            }
            .el-dialog__body{
                padding: 0;
                background-color: transparent;
            }
        }
    }
}
</style>