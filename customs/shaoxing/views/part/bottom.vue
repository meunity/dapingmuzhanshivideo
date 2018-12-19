<template>
      <div class="part-bottom">
        <div class="dig-time">
          <span>{{nowTime}}</span>
        </div>
        <div class="buts">
          <el-button class="foot-butt" 
              :class="[page.activeIndex === page.code?'foot-butt-active':'foot-butt']"
              v-for="page in pages" 
              :key="page.code" 
              @click="switchPages(pages,page,page.theme)">
          {{page.name}}</el-button>
        </div>
      </div>
</template>

<script>
export default {
  props: {},
  data(){
    return {
      nowTime: "",
      curcode: null,
      pages:[
        {
          activeIndex:1,
          code:1 , name:"集团概况","theme":"introduce"
        },
        // {
        //   code:2 , name:"智慧平台","theme":"intelligence"
        // },
        {
          code:3 , name:"科学管理","theme":"science"
        },
        // {
        //   code:4 , name:"供排水综合管理","theme":"applypump"
        // },
        {
          code:5 , name:"调度中心","theme":"check"
        },
        // {
        //   code:6 , name:"供水服务"
        // },
        // {
        //   code:7 , name:"工程管理"
        // }
      ]
    }
  },
  created() {
     this.nowTimes();
  },
  mounted() {},
  computed:{},
  methods: {
    switchPages(pages,page,theme){
      // debugger
      $.each(pages,function(v,r){
        r.activeIndex = 0;
      })
      this.$set(page, 'activeIndex', page.code);
      if(theme){
        this.$emit("change-theme", theme);
      }
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      this.nowTime = year + "-" + month + "-" + date +""+"   "+hh+":"+mm+":"+ss ;
    },
    nowTimes(){
      this.timeFormate(new Date());
      setTimeout(this.nowTimes,1000);
    },
  },
  watch: {
  },
  components:{}
};
</script>
<style lang="less" >
@font-face {  
  font-family: 'DIGIFAW';
  src: url('../../../../font/digifaw.ttf'); 
  font-weight: normal;  
  font-style: normal;  
}
.part-bottom{
    // width: 1920px;
    width: 100%;
    z-index: 1000;
    position: absolute;
    height:48px;
    overflow: hidden;
    box-sizing: border-box;
    // float: left;
    background-color: #000000;
	  border: solid 2px rgba(89, 90, 90, 0.8);
    
    .dig-time{
      font-family: 'DIGIFAW';
      float: left;
      display: block;
      padding-left: 18px;
      font-size: 24px;
      line-height: 48px;
	    font-weight: normal;
	    font-stretch: normal;
	    letter-spacing: 2px;
      color: #16646e;
    };
    .buts{
      float: right;
      padding-right: 40px;
      .foot-butt{
        width: 180px;
        height: 46px;
        border: none;
        margin-top: 1px;
        padding-right: 10px;
        border-radius: 0px;
        color: #e9e9e9;
        font-family: MicrosoftYaHei;
        font-size: 18px;
	      background-image: radial-gradient(
          #272323,
		      rgba(48, 49, 53, 0.8)
        );
        &:hover{
          background-image: linear-gradient(
		        rgba(14, 98, 114, 0.8), 
		        rgba(14, 98, 114, 0.8)), 
	        linear-gradient(
		        #000000, 
		        #000000);
	        background-blend-mode: normal, 
		          normal;
          }
      }
      .foot-butt-active{
        width: 180px;
        height: 46px;
        border: none;
        margin-top: 1px;
        padding-right: 10px;
        border-radius: 0px;
        color: #e9e9e9;
        font-family: MicrosoftYaHei;
        font-size: 18px;
	      background-image: linear-gradient(
		        rgba(14, 98, 114, 0.8), 
		        rgba(14, 98, 114, 0.8)), 
	        linear-gradient(
		        #000000, 
		        #000000);
        &:hover{
          background-image: linear-gradient(
		        rgba(14, 98, 114, 0.8), 
		        rgba(14, 98, 114, 0.8)), 
	        linear-gradient(
		        #000000, 
		        #000000);
	        background-blend-mode: normal, 
		          normal;
        }
      }
    }
}
</style>