    <template>
          <div class="part-center">
              <!-- <my-map></my-map> -->
            
            <div style="height:100%;position:relative;">
              <div class="map-switch" v-if="theme == 'check'||theme == 'applypump'" :style="{top:theme=='applypump'?'-4px':'171px'}">
                <span class="map-click" id="map_1" :class="{'active':selectId==1}">
                  <a @click="switchMap(1)">管网压力变化</a>
                </span>
                <span class="map-click" id="map_2" :class="{'active':selectId==2}">
                  <a @click="switchMap(2)">管网流量分布</a>
                </span>
                <span class="map-click" id="map_3" :class="{'active':selectId==3}">
                  <a @click="switchMap(3)">管网事件分布</a>
                </span>
              </div>
            
                <!-- <iframe src="http://121.40.242.176:8091/#/pressuremap" width="100%" height="100%;" style="border-width: 0px!important;" id="m_map"></iframe> -->
            </div>
            <div class="map-warp">
              <iframe name="m_map2"  :style="{zIndex:selectId==1?10:1}" src="http://121.40.242.176:8091/#/pressuremap" width="100%" height="100%;" style="border-width: 0px!important;position:absolute;z-index:20;" id="m_map2"></iframe>
              <iframe name="m_map1" :style="{zIndex:selectId==2?10:1}" src="http://121.40.242.176:8091/#/flowmap" width="100%" height="100%;" style="border-width: 0px!important;position:absolute;z-index:10;" id="m_map1"></iframe>
                
                <iframe name="m_map3" :style="{zIndex:selectId==3?10:1}" src="http://121.40.242.176:8091/#/eventmap" width="100%" height="100%;" style="border-width: 0px!important;position:absolute;z-index:30;" id="m_map3"></iframe>
            </div>
          </div>
           
    </template>

    <script>
    import partRight from './right.vue'
    import partTop from './top.vue'
    // import MyMap from '../components/myMap.vue'

    export default {
      props: {
        theme: String
      },
      data(){
        return {
          selectId:1
        }
      },
      created() {
        },
      computed:{},
      methods: {
        switchMap(key){
          this.selectId = key
        }
      },
      watch: {},
      components:{
          partRight,
          partTop,
        //   MyMap
      }
    };
    </script>
    <style lang="less" >
    .part-center{
        float: left;
        width: 54%;
        height: 100%;
        box-sizing: border-box;
        // position: relative;
        .map-switch{
          z-index: 2000;
          width: 100%;
          height: 29px;
          box-sizing: border-box;
          position: absolute;
    	    background-color: #000000;
          border: solid 2px rgba(89, 90, 90, 0.8);
          font-family: MicrosoftYaHei-Bold;
          font-size: 14px;
          font-weight: 600;
          line-height: 29px;
          color: #747474;
          .map-click{
            margin-left: 9px;
            margin-right: 30px;
            a{
              cursor: pointer;
            }
            &.active{
              color: #198e9d;
            }
          }
          
        }
        .map-warp{
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: transparent;
          top: 0;
          left: 0;
          z-index: 0;
          iframe{
            background-color: transparent;
          }
        }
    }
    </style>
