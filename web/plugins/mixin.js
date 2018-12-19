import Vue from 'vue';
import { BindRecords,Bind,SetBind } from "./binding";
import { NumberFormat,DateFormat,ShortTime,TimeSpan,PercentFormat,colwidth} from "cue/src/utils/util.js";
import {StatusSwitch} from "./mixins/scope";
import common from "../modules/common.js";

const uuid = require('uuid');
Vue.mixin({
    props:{
        args:{
            type:Object,
            default(){
                return {}
            }
        }/*,
        componentState:{
            type:Boolean,
            default:true
        }*/
    },
    data() {
        return {
            componentState:true
        }
    },
    methods:{
        StatusSwitch:StatusSwitch,
        BindRecords:BindRecords,
        Bind: Bind,
        SetBind:SetBind,
        NumberFormat:NumberFormat,
        PercentFormat:PercentFormat,
        DateFormat:DateFormat,
        ShortTime:ShortTime,
        TimeSpan:TimeSpan,
        colwidth:colwidth,
        uuid:uuid,
        // myImport(url,grid) {
        //      debugger
        //     let self = this;
        //     let $iframe = jQuery("#ifm_upload");
        //     $($iframe[0].contentWindow.document.getElementById("file")).on("change", function() {
        //       var file = $iframe[0].contentWindow.document.getElementById("file").value;
        //       if (file.length == 0) {
        //         return;
        //       }
        //       if (!/\.(xls|xlsx)$/.test(file.toLowerCase())) {
        //         self.$message({message:"请选择扩展名为（.xls|.xlsx）的文件", type: 'warning'});
        //       } else {
        //         // Loading.Show("文件上传中...", 99999999);
        //         $iframe[0].contentWindow.document.forms[0].submit();
        //       }
        //     });
        //     $iframe.off("load").on("load", function() {
        //       if (this.contentWindow.location.pathname == "/upload") {
        //         $(this).attr("src", $(this).attr("src"));
        //         var result =   eval('(' + this.contentWindow.document.body.innerHTML + ')') ;
        //         if (result) {
        //           $.Loader(
        //             url,
        //             { fnm: result.name},
        //             function(response) {
        //                 if(grid){
        //                     self.$refs[grid].Query()
        //                 }else{
        //                     self.$refs.report.Query()
        //                 }
                       
        //                 self.$message({message:"保存成功", type: 'success'});
                        
                      
        //             },
        //             function(message) {
        //                 self.$message({message:message, type: 'warning'});
                     
        //             }
        //           );
        //         } else {
        //           message["info"]("上传失败");
        //         }
        //       }
        //     });
        //     $iframe[0].contentWindow.document.getElementById("file").click();
        //   },
        TreeIcon(node){
            let self=this;
            if($.isArray(node)){
                $.each(node,(_,n)=>{self.TreeIcon(n)});
                return
            }
            if(node.type=="group") node.iconSkin="x-font x-font-yongshuigongsi";
            if(node.type=="station") node.iconSkin="x-font x-font-jiance";
            node.children=node.children||[];
            if(node.children.length>0) self.TreeIcon(node.children);
        },
        ArgToArray(v){
            if(v==undefined) return [];
            //type  string,null,array
            if (v && typeof v == "string") {
                return v.split(",");
            }
            return []
        },
        GetParams(){
            var q=$.extend(true,{},this.$route.query||{});
            $.each(q,(k,v)=>{
                if(Array.isArray(v)){
                    q[k]=v.join(",");
                }
            });
            var p=$.extend(true,{},this.$route.params||{});
            var a=$.extend(true,{},this.args||{});
            return $.extend(true,{},a,p,q);
        },
        getPage(key,cate){
            cate = cate?cate:'RUN_ANALYSIS';
            var pages = [];
            if(!key){return pages;}
            var domabilitys = window.domabilitys;
            if(domabilitys == null || domabilitys.length == 0){
                return pages;
            }
            $.each(domabilitys,function(i,r){
                if(r.domain == cate && r.object == key){
                    pages.push({code:r.value,name:r.name});
                }
            })
            return pages;
        },
        getFirstNode(data){
            let that = this;
            for(var i=0;i<data.length;i++){
                var child = data[i];
                if(child.extension.indexOf("disabled")>-1){
                    if(child.children && child.children.length>0){
                        return that.getFirstNode(child.children);
                    }
                }else{
                    return child.extension;
                }
            }
        },
        Resize(){},
        parseParams(query){
          let params = {}, e;
          var re = /([^&=]+)=?([^&]*)/g,decodeRE = /\+/g,decode = function (str) { return decodeURIComponent( str.replace(decodeRE, " ") ); };
          while ( e = re.exec(query) ) params[ decode(e[1]) ] = decode( e[2] );
          return params;
        },
        getDomabilityParam(key,cate,value){
          let that = this;
          cate = cate?cate:'RUN_ANALYSIS';
          var params = {};
          if(!key || !value){return params;}
          var domabilitys = window.domabilitys;
          if(domabilitys == null || domabilitys.length == 0){
              return params;
          }
          $.each(domabilitys,function(i,r){
            if(r.domain == cate && r.object == key && r.value == value){
                  if(!!r.params){
                    params = eval('('+r.params+')')
                  }
                  return false;
              }
          })
          return params;
        },
        domabilityParamToParams(key,cate,value){
          var domabilityParams = this.getDomabilityParam(key,cate,value) || {};
          var params = $.extend(true,{},params,domabilityParams);
          return params
        },
        kglFormat(V, R, I) {//开关量转换
          var val,unit,Rtn = "";
          if (typeof V == "object") {
            val = V.val;
            unit = V.unit || ""; //单位
          }else{
            val = V;
            if(R && 'unit' in R && R.unit){
              unit = R.unit; //单位
            }
          }

          if(Vue.filter("KGLFORMAT") && $.isNumeric(val)){
            Rtn = Vue.filter("KGLFORMAT")(val, unit);
          }else{
            Rtn = val;
          }

          return Rtn;
        },
        SensorValue(V,R,I){
            var Rtn = this.kglFormat(V,R,I);
            if(typeof Rtn=="number"&&('precision' in V)){
                Rtn=common.Precision(Rtn,V.precision);
            }
            return Rtn;
        },
        filterValue(unit,value){
          var Rtn = Vue.filter("KGLFORMAT")(value, unit);
          return Rtn;
        }
    }
});
