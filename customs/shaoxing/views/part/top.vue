<template>
  <div class="part-top">
    <el-row>
      <el-col :span="12">
        <div class="logo"></div>
        <div class="right-part">
          <div class="logo-text">
            <div class="sx-title">供排水一体化运营管理平台</div>
            <div class="sx-name">绍兴市水务产业有限公司</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wheather">
          <wheather></wheather>
        </div>
      </el-col>
    </el-row> 
  </div>
</template>

<script>
import wheather from '../components/wheather.vue'
export default {
  components:{ wheather },
  props: {},
  data(){
    return {}
  },
  created() {},
  mounted() {},
  computed:{},
  methods: {},
  watch: {},
};
</script>
<style lang="less" >
.part-top{
    height:83px;
    background-color: #000000;
    border: solid 2px rgba(89, 90, 90, 0.8);
      .logo{
        width: 70px;
	      height: 80px;
        margin-top: 1px;
        float: left;
        background-image: url('../../../../static/images/logo.png');
      }
      .right-part{
        float: left;
        margin-left: 27px;
        height: 65px; 
        .logo-text{
          height: 100%;
          .sx-title{
            width: 315px;
            height: 25px;
            margin-top: 19px;
            font-family: MicrosoftYaHei;
            font-size: 24px;
            letter-spacing: 2px;
            color: #e9e9e9;
          }
          .sx-name{
            width: 360px;
            height: 12px;
            margin-top: 8px;
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: 100;
            letter-spacing: 18px;
            color: #716f6f;
          }
        }     
        // .wheather{
        //   padding-top: 5px;
        // }  
      }      
}
</style>