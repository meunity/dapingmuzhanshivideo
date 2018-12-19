import {KGLFORMAT} from "cue/src/utils/util.js";
export default {
    table: function(ref, before, after, R) {
        var formatVal = function (model, column, row) {
            if (typeof model == 'object') {
                var params = column.data.split('.');
                params.shift();
                for (var i = 0; i < params.length; i++) {
                    var obj = params[i];
                    model = model[obj];
                }
            }
            var v = "";
            switch (typeof column.format) {
                case 'function':
                    v = column.format(model, row);
                    break;
                case 'number':
                    if (typeof model == "number") {
                        var dig_pow = Math.pow(10, column.format);
                        v = Math.round(model * dig_pow) / dig_pow;
                    } else {
                        v = model;
                    }
                    break;
                case 'string':
                    if (column.type == 'date') {
                        if (model) {
                            v = new Date(String(model).length == 13 ? model : model * 1000).Format(column.format);
                        } else {
                            v = null;
                        }

                    } else {
                        v = Vue.filter("CODE")({ code: column.format, value: model });
                    }
                    break;
                case 'object':
                    if (column.type == 'select' && column.format.length > 0) {
                        var d = column.format.find(function(d) {
                            if (d.value == model) {
                                v = d;
                            }
                        });
                        v = d ? d.name : model;
                    }
                    break;
                default: {
                    v = model;
                }
            }
            return v;
        }
        var Content = ["<table width='2000' style='font-family: 宋体;font-size:16px;'>"];
        var Fields = [];
        if ($.isArray(ref)) {
            Fields = ref;
        } else {
            Fields = ref.leftColumns.concat(ref.areaColumns, ref.rightColumns);
        }
        var Field = {};
        var Column = {};
        if (before) {
            Content.push(before(R, Fields));
        }
        if (R && R.rows) {
            var Rows = R.rows;
            Content.push("<tr>");
            for (var j = 0, len = Fields.length; j < len; j++) {
                if (!Fields[j].hidden) {
                    var cell_style = Fields[j].estyle || "border:solid 0.5pt #000000;font-size: 16px;"
                    Content.push("<td");
                    Content.push(" style='" + cell_style + "'");
                    if (Fields[j].align || Fields[j].halign) {
                        Content.push("text-align:");
                        Content.push(Fields[j].align || Fields[j].halign);
                        Content.push(";");
                    }
                    if (Fields[j].width) {
                        Content.push("\" width=\"");
                        Content.push(Fields[j].width);
                    }
                    Content.push("\" rowspan=\"");
                    Content.push(Fields[j].rowspan || 1);
                    Content.push("\" colspan=\"");
                    Content.push(Fields[j].colspan || 1);
                    Content.push("\" >&nbsp;");
                    Content.push(Fields[j].title);
                    Content.push("</td>");
                    if (Fields[j].data) {
                        Field[Fields[j].data] = Fields[j];
                    }
                }
            }
            Content.push("</tr>");
            //生成数据记录

            for (var i = 0, len = Rows.length; i < len; i++) {
                Content.push("<tr>");
                for (var j = 0, lenj = Fields.length; j < lenj; j++) {
                    if (Fields[j].hidden) continue
                    // var cell_formatter = Fields[j].format || null;
                    var cell_val = formatVal(GetRowValue(Rows[i], Fields[j].data), Fields[j], Rows[i]);
                    var cell_type = Fields[j].datatype || "String";
                    var cell_align = "center";
                    var cell_style = Fields[j].estyle || "border:solid 0.5pt #000000;font-size: 16px;"
                    Content.push("<td");
                    Content.push(" style='" + cell_style + "'");
                    Content.push(" align='" + cell_align + "'");
                    if (Fields[j].datatype != 'Number') {
                        if (cell_val) {
                            if (cell_val.length == 1) {
                                if (cell_val != '0') {
                                    Content.push("vnd.ms-excel.numberformat:@\"");
                                }
                            } else {
                                if (!((!isNaN(cell_val)) && (cell_val + "  ").substring(0, 1) != '0' && (cell_val + "  ").substring(0, 2) != '0.')) {
                                    cell_val = "&nbsp;" + cell_val + "";
                                    // if (cell_val && jQuery.isFunction(cell_val.substr) && (cell_val + "  ").trim().substr(0, 1) == '0')
                                    // {
                                    //     Content.push("vnd.ms-excel.numberformat:@\"");
                                    // } else if ((cell_val + "").indexOf("-") >= 0)
                                    // {
                                    //     cell_val = "&nbsp;" + cell_val + "";
                                    // };
                                }
                            }
                        } else {
                            Content.push("vnd.ms-excel.numberformat:@\"");
                        }
                    }
                    Content.push(">");
                    Content.push(cell_val);
                    Content.push("</td>");
                }
                Content.push("</tr>");
            }
        }
        if (after) {
            Content.push(after(R, Fields));
        }
        return Content.join("");
    },

    YMD: function(unixTimeStamp){
        if(unixTimeStamp == 0 || unixTimeStamp == null){
            return "";
        }
        return new Date(unixTimeStamp*1000).FormatString("yyyy-MM-dd")
    },
    HHMM: function(unixTimeStamp){
        if(unixTimeStamp == 0 || unixTimeStamp == null){
            return "";
        }
        return new Date(unixTimeStamp*1000).FormatString("HH:mm")
    },

    STime: function(unixTimeStamp){

        if(unixTimeStamp == 0 || unixTimeStamp == null){
            return "";
        }

        var ts = new Date(unixTimeStamp*1000)
        var now = new Date().FormatString("yyyy-MM-dd")
        var cur = ts.FormatString("yyyy-MM-dd")

        if (cur != now){
            return ts.FormatString("MM-dd HH:mm")
        }

        return ts.FormatString("HH:mm")
    },

    Precision: function(val, precision, default_value){

        if(val != null && (!isNaN(val)) && precision >= 0) {
            return val.toFixed(precision);
        }

        return val == null ? default_value : val
    },

    Unit: function(val, type){
      var Rtn = val;
      if(type.unit && $.isNumeric(val)){
        Rtn = KGLFORMAT(val,type.unit);
        // Rtn = KGLFORMAT(17,'@正常|停用|被盗|撞倒|偷水|电池欠压|通讯故障$');//debugger
      }


      // if(type.unit && type.unit.toString().indexOf(":") > 0) {
      //   if($.isNumeric(val)){
      //       var Rtn = "";
      //       var c = type.unit.split("#");
      //       for (var i = 0; i < c.length; i++) {
      //           if (c[i] && c[i].indexOf("*" + val.toString() + ":") >= 0) {
      //               Rtn = c[i].split(":")[1];
      //           }
      //       }
      //       return Rtn;
      //   }
      //   return null;
      // }

      return this.Precision(Rtn, type.precision);
    },
    isExist: function(data,target){
      let idx = this.Index(data,target)
      if(idx>-1){
        return true;
      }else{
        return false;
      }
    },
    Index: function(data,target){
      let idx = (data || []).findIndex(function(c){
          return c._id == target._id;
      });
      return idx;
    },
    isEmptyObject: function(obj){
      if (JSON.stringify(obj) == '{}') {
          return true;
      } else {
          return false;
      }
    }
}
