<template>
    <div class="panle">
        <div class="panle-body">
            <div class="panle-title">
                <span>{{title}}</span>
            </div>
            <div class="panle-content">
                <slot></slot>
            </div>
            
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            title: String
        },
        data() {
            return{}
        }
    }
</script>
<style lang="less" scoped>
@blue: #01CEF6;
.panle{
    position: relative;
    background-color: rgba(0,0,0,0.8);
    // margin: 10px 0;
    padding: 10px;
    z-index: 3;
    .panle-body{
        .panle-title{
            padding-left: 20px;
            background: linear-gradient(to right, #063943 , rgba(0,0,0,0.1));
            line-height: 22px;
            margin-bottom: 10px;
            span{
                font-size: 14px;
                color: @blue;
                font-weight: bold;
                &:before{
                    display: inline-block;
                    content: '';
                    height: 6px;
                    width: 6px;
                    background-color: @blue;
                    margin-right: 10px;
                    margin-bottom: 1px;
                }
            }
        }
        .panle-content{
            // width: 90%;
            // height: 65%;
            // margin-left: 4.5%;
            // margin-top: 1.8%;
            // position: relative;
            // padding: 5px;
        }
    }
}
</style>
