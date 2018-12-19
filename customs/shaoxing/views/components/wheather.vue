<template>
    <div class="hd-wheather">
        <el-row type="flex" :gutter="20">
            <el-col :span="13"></el-col>
            <el-col v-for="(ret,i) in ret_weather" :key="i" :span="i == 0 ? 5 : 3">
                <div class="content wheather-left" v-if="i == 0">
                    <table>
                        <tr>
                            <td rowspan="2" colspan="2">
                                <div>
                                <img width="60"  v-if="weatherddic[ret.weather]" class="img" :src="'/static/images/night1/'+(weatherddic[ret.weather])+'.png'">
                                <img width="60"  v-else class="img" :src="'/static/images/night1/duoyun.png'">
                                </div>
                            </td>
                            <td>{{ret.mintemp||10}}℃/{{ret.maxtemp||17}}℃</td>
                        </tr>
                        <tr>
                            <td class="day">{{['今天','明天','后天'][i]}}</td>
                        </tr>
                    </table>
                </div>
                <div class="content wheather-right" v-else>
                    <table>
                        <tr>
                            <td class="day">{{['今天','明天','后天'][i]}}</td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                <img width="25"  v-if="weatherddic[ret.weather]" class="img" :src="'/static/images/night1/'+(weatherddic[ret.weather])+'.png'">
                                <img width="25"  v-else class="img" :src="'/static/images/night1/duoyun.png'">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="temp">{{ret.mintemp||10}}℃/{{ret.maxtemp||17}}℃</td>
                        </tr>
                    </table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { API } from "../modules/service.js";
export default {
    data() {
        return {
            weatherddic: {
                阴:"yin",
                多云:"duoyun",
                晴:"qin",
                阵雨:"zhenyu",
                大雨:"dayu",
                小雨:"xiaoyu",
                中雨:"zhongyu",
            },
            weatherImgDic: {
                晴: "晴天",
                "小雨-中雨": "小雨转中雨",
                "小雨到中雨": "小雨转中雨",
                "中雨-大雨": "中雨转大雨",
                "中到大雨": "中雨转大雨",
                "大雨-暴雨": "大雨转暴雨",
                "暴雨-大暴雨": "暴雨转大暴雨",
                "大暴雨-特大暴雨": "大暴雨转特大暴雨",
                "大雨到暴雨": "大雨转暴雨",
                "暴雨到大暴雨": "暴雨转大暴雨",
                "大暴雨到特大暴雨": "大暴雨转特大暴雨",
                "小雪-中雪": "小雪转中雪",
                "中雪-大雪": "中雪转大雪",
                "大雪-暴雪": "大雪转暴雪",
                强沙尘暴: "特强沙尘暴",
                浓雾: "雾",
                强浓雾: "雾",
                霾: "雾",
                中毒霾: "雾",
                重度霾: "雾",
                严重霾: "雾",
                大雾: "雾",
                特强浓雾: "雾",
                无: "",
                雨: "小雨",
                雪: "小雪",
                少云: "多云"
            },
            ret_weather: [],
        }
    },
    methods: {
        getWeather(){
            let self=this;
            
            let today=new Date();
            let td=new Date(today.getTime() / 1000 * 1000).FormatString("yyyy-MM-dd")
            let tomorrow=new Date((today.getTime() / 1000 + 86400) * 1000).FormatString("yyyy-MM-dd");
            let after=new Date((today.getTime() / 1000 + 86400*2) * 1000).FormatString("yyyy-MM-dd");
            let oD={};
            oD[td]={};
            oD[tomorrow]={};
            oD[after]={}
            API.getWeatherData({"prefix":"sxgs","Token":"57938fae42de38519530128f", query: { dt: { $in: [td, tomorrow, after]} } }).done(function(r) {
            $.each(r.rows, function(ri, rv) {
                Object.assign(oD[rv.dt], rv);
            });
            self.ret_weather = [oD[td], oD[tomorrow], oD[after]];
                if(JSON.stringify(self.ret_weather[2]) == '{}'){
                    self.ret_weather[2] = {
                        weather: '多云',
                        mintemp: 10,
                        maxtemp:20,
                        dt: '2018-11-09'
                    }
                }
            })
        },
    },
    created() {
        this.getWeather()
    },
}
</script>
<style lang="less" scoped>
.hd-wheather{
    color: white;
    padding: 6px 0;
    box-sizing: border-box;
    margin-right: 10px;
    .content{
        .day{
            color: #747474;
            font-size: 12px;
        }
        &.wheather-right{
            table{
                td{
                    text-align: center;
                }
                .temp{
                    font-size: 12px;
                }
            }
        }
        &.wheather-left{
            border-right: 1px solid #242424; 
        }
    }
}
</style>
