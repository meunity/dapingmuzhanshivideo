<template>
    <div class="part-middle">
        <part-left :theme="theme"></part-left>
        <part-center :theme="theme"></part-center>
        <part-right v-if="theme == 'check'"></part-right>
        <applypump-right v-if="theme == 'applypump'"></applypump-right>
    </div>

</template>

<script>
import ApplypumpRight from './applypumpRight'
import partLeft from './left'
import partCenter from './center'
import partRight from './right'
export default {
    props: {
        theme: String
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {},
    watch: {},
    components: {
        partLeft,
        partCenter,
        partRight,
        ApplypumpRight
    }
}
</script>
<style lang="less" >
.part-middle {
    float: left;
    height: 100%;
    width: 100%;
    .el-tabs__header{
      margin: 0;
      .el-tabs__nav-wrap{
        background: linear-gradient(to right, #080808 , #202126);
        .el-tabs__active-bar{
          background-color: #198E9D;
        }
        .el-tabs__item{
          color: #6D6D6D;
          // padding: 0 10px;
          height: 22px;
          line-height: 22px;
          &.is-active{
            color: white;
          }
          &:hover{
            color: white;
          }
        }
        &:after{
          display: none;
        }
      }
    }
}
</style>