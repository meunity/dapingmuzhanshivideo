<template>
      <div class="introduce-index">
        <div v-if="theme=='science'">
          <img :src="showPic" id="pic_intro" style="width:100%;height:927px">
          <div class="btn-group">
            <div class="pic-btn" 
                    v-for="pic in pic_urls"
                    :class="[pic.activeIndex === pic.code?'pic-btn-active':'pic-btn']"
                    :key="pic.code" 
                    @click="switchPic(pic_urls,pic)">
            </div>
          </div>
        </div>
        <div v-if="theme=='introduce'">
            <img src="../../../../../static/images/company/a-intro.png" id="pic_introduce" style="width:100%;height:927px">
        </div>

         <div v-if="theme=='intelligence'">
              <img src="../../../../../static/images/company/b-intro.png" id="pic_intelligence" style="width:100%;height:927px">
        </div>

      </div>
       
</template>

<script>
export default {
  props: {
    "theme":""
  },
  data(){
    return {
      showPic:"../../../../../static/images/company/c-intro.png",
      pic_urls:[
      //   {
      //   code:1,
      //   activeIndex:1,
      //   url:"../../../../../static/images/company/a-intro.png"
      // },{
      //   code:2,
      //   activeIndex:0,
      //   url:"../../../../../static/images/company/b-intro.png"
      // },
      {
        code:3,
        activeIndex:3,
        url:"../../../../../static/images/company/c-intro.png"
      },{
        code:4,
        activeIndex:0,
        url:"../../../../../static/images/company/d-intro.png"
      }]
    }
  },
  created() {

  },
  mounted() {},
  computed:{},
  methods: {
    switchPic(pic_urls,pic){
      debugger
      $.each(pic_urls,function(v,r){
        r.activeIndex = 0;
      })
      pic.activeIndex = pic.code;
      this.showPic=pic.url
      // this.$set(pic, 'activeIndex', pic.code);
      // $("#pic_intro").attr('src',pic.url); 
      console.log(pic_urls);
      
    }
  },
  watch: {},
  components:{}
};
</script>
<style lang="less" >
.introduce-index{
    float: left;
    // height: 100%;
    position: absolute;
    height: 100%;
    width: 100%;
    .btn-group{
      position: absolute;
      top: 904px;
      margin-left: 800px;
      width: 300px;
      background-color: #000000;
      .pic-btn{
        float: left;
        background: rgb(0, 76, 103);
        margin-left: 10px;
        width: 60px;
        height: 6px;
      }
      .pic-btn-active{
        float: left;
        background: rgb(0, 189, 255);
        margin-left: 10px;
        width: 60px;
        height: 6px;
      }
    }
    
}
</style>