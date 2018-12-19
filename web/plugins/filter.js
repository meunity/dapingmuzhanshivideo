import Vue from 'vue';
import { BindRecords,Bind } from "./binding.js";
import { NumberFormat,DateFormat,ShortTime,TimeSpan,PercentFormat,KGLFORMAT} from "cue/src/utils/util.js";
//注册过滤器
Vue.filter("BINDINGS", BindRecords);
//根据数据字典类型和Value获取Name值
Vue.filter("CODE", Bind);
//数字格式化
Vue.filter("NUMBER", NumberFormat);
//时间格式化
Vue.filter("DATE", DateFormat);

Vue.filter("ShortTime", ShortTime);

Vue.filter("TimeSpan", TimeSpan);

Vue.filter("PercentFormat", PercentFormat);

Vue.filter("KGLFORMAT", KGLFORMAT);
