/*Version:Proxy 1.0.0.0*/
//和达电子脚本组件命名空间管理
var HD =
{
    Exception:
    {
        Get: function (Code)
        {
            if (this[Code])
            {
                return this[Code];
            }
            else
            {
                return "未知错误";
            }
        },
        10000: "系统错误，请联系管理员",
        10001: "系统错误，请联系管理员",
        10002: "服务不可用，请联系管理员",
        20000: "服务错误，请联系管理员",
        20004: "账号或密码错误，请重试",
        20005: "账号不存在，请联系管理员",
        20007: "账号不可用，请联系管理员"
    },
    Context: {}, //前台Session，存放Token等变量值
    Get: function (Key)
    {
        return HD.Context[Key];
    },
    Set: function (Key, Value)
    {
        HD.Context[Key] = Value;
    },
    Clear: function (Key, All)
    {
        if (All === true)
        {
            HD.Context = {};
        }
        else
        {
            delete HD.Context[Key];
        }
    },
    Register: function (Namespace, Component, Options)
    {
        if (Namespace.length > 0)
        {
            var Ns = Namespace.split(".");
            var This = this;
            for (var i = 0, len = Ns.length; i < len; i++)
            {
                if (Ns[i].length > 0)
                {
                    if (i == len - 1)
                    {
                        if (This[Ns[i]])
                        {
                            return { State: false, Message: "注册失败，该命名空间已经存在" };
                        }
                        else
                        {
                            This[Ns[i]] = Component;
                            return { State: true, Message: "注册成功" };
                        }
                    }
                    else
                    {
                        if (This[Ns[i]])
                        {
                            This = This[Ns[i]];
                        }
                        else
                        {
                            This = This[Ns[i]] = {};
                        }
                    }
                }
                else
                {
                    return { State: false, Message: "必须指定命名空间" };
                }
            }
        }
        else
        {
            return { State: false, Message: "必须指定命名空间" };
        }
    }
};
var Proxy =
{
    /* 使用jQuery.ajax的post方式访问WCF
    * URL：WCF地址
    * Parameters：访问参数对象
    * Callback：回调函数
    */
    RequestWCF: function (Params)
    {
        var defaults = {
            type: "post",
            //contentType: "application/json",
            dataType: "json"
        };

        if (!!Params.parameter)
        {
            Params['data'] = Proxy.Json.ToString(Params.parameter);
            delete Params.parameter;
        }

        return jQuery.ajax(jQuery.extend(defaults, Params));
    },
    Json:
    {
        /* Json格式的字符串转换为对象
        * Str：Json格式的字符串
        */
        ToObject: function (Str)
        {
            try
            {
                return eval('(' + Str + ')');
            }
            catch (ex)
            {
                return Str;
            }
        },
        /* 对象转换为Json格式的字符串
        * Obj：对象
        */
        ToString: function (Obj)
        {
            if (!!JSON && !!JSON.stringify) return JSON.stringify(Obj);

            var THIS = this;
            switch (typeof (Obj))
            {
                case 'string':
                    return '"' + Obj.replace(/(["\\])/g, '\\$1') + '"';
                case 'array':
                    return '[' + Obj.map(THIS.ToString).join(',') + ']';
                case 'object':
                    if (Obj instanceof Array)
                    {
                        var Arr = [];
                        var len = Obj.length;
                        for (var i = 0; i < len; i++)
                        {
                            Arr.push(THIS.ToString(Obj[i]));
                        }
                        return '[' + Arr.join(',') + ']';
                    }
                    else if (Obj == null)
                    {
                        return 'null';
                    }
                    else
                    {
                        var Arr = [];
                        for (var property in Obj)
                        {
                            Arr.push(THIS.ToString(property) + ':' + THIS.ToString(Obj[property]));
                        }
                        return '{' + Arr.join(',') + '}';
                    }
                case 'number':
                    return Obj;
                case false:
                    return Obj;
            }
        }
    },
    Cookie:
    {
        /* 设置Cookie
        * Key：Cookie键名
        * Value：Cookie键值
        * Expiredays：过期时间
        */
        Set: function (Key, Value, Expiredays)
        {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + Expiredays);
            document.cookie = Key + "=" + escape(Value) + ((Expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        },
        /* 获取Cookie中指定键名的值
        * Key：Cookie键名
        */
        Get: function (Key)
        {
            if (document.cookie.length > 0)
            {
                c_start = document.cookie.indexOf(Key + "=");
                if (c_start != -1)
                {
                    c_start = c_start + Key.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1)
                    {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end))
                }
            }
            return null;
        },
        /* 移除指定键名的Cookie项
        * Key：Cookie键名
        */
        Clear: function (Key)
        {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.Get(Key);
            document.cookie = Key + "=" + cval + "; expires=" + exp.toGMTString();
        }
    },
    Bind:
    {
        /* 绑定Select元素的选项
        * Ele：Select元素
        * Items：选项数组
        * Config：绑定配置。TextBinding：文本字段名；ValueBinding：值字段名；Filter：过滤器，function（Item）{Return true/false}
        */
        Select: function (Ele, Items, Config)
        {
            if (Ele && Ele.tagName.toLowerCase() == "select")
            {
                for (var i = 0, Arr = Ele.options, len = Arr.length; i < len; i++)
                {
                    Arr.remove(0);
                }
                var TextBinding = (Config && Config.TextBinding) ? Config.TextBinding : "Name";
                var ValueBinding = (Config && Config.ValueBinding) ? Config.ValueBinding : "Id";
                var Filter = (Config && Config.Filter) ? Config.Filter : null;
                for (var i = 0, len = Items.length; i < len; i++)
                {
                    if (Filter === null || Filter && Filter(Items[i]))
                    {
                        var Opt = new Option(Items[i][TextBinding], Items[i][ValueBinding]);
                        Ele.options.add(Opt);
                    }
                }
            }
            else if (IsDebug)
            {
                alert("绑定对象不是选择框元素");
            }
        }
    },
    /* 预加载图片对象，加载完成后执行指定的回调函数
    * Url：图片路径
    * Callback：回调函数，回调函数中this指向图片对象
    * Params：回调函数的参数
    */
    LoadImage: function (Url, Callback, Params)
    {
        var Img = new Image();
        //创建一个Image对象，实现图片的预下载
        Img.src = Url;
        if (Img.complete)
        {
            // 如果图片已经存在于浏览器缓存，直接调用回调函数
            Callback.call(Img, Params);
            return;
            // 直接返回，不用再处理onload事件
        }
        Img.onload = function ()
        {
            //图片下载完毕时异步调用callback函数。
            Callback.call(Img, Params);
            //将回调函数的this替换为Image对象
        }
    },
    /* 获取指定键名的Url请求参数值
    * Key：键名
    */
    GetUrlParam: function (Key, Win)
    {
        if (!Win)
        {
            Win = window;
        }
        var Regex = new RegExp("[\?&]" + Key + "=[^&]+", "g");
        var Result = Win.location.search.match(Regex);
        if (Result && Result.length > 0)
        {
            return Result[0].substr(Result[0].indexOf("=") + 1);
        }
        else
        {
            return null;
        }
    }
};
//字符串去除两端空白字符
String.prototype.Trim = function ()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
//字符串去除左侧空白字符
String.prototype.LTrim = function ()
{
    return this.replace(/(^\s*)/g, "");
};
//字符串去除右侧空白字符
String.prototype.RTrim = function ()
{
    return this.replace(/(\s*$)/g, "");
};
//字符串去除所有空白字符
String.prototype.ClearSpace = function ()
{
    return this.replace(/\s/g, "");
};
//字符串拆分，如果字符串为空，返回空数组
String.prototype.Split = function (Separator)
{
    var Result = [];
    if (this.length > 0)
    {
        Result = this.split(Separator);
    }
    return Result;
};
//字符串长度（中文*2）
String.prototype.Length = function ()
{
    var Arr = this.match(/[^\x00-\xff]/ig);
    return this.length + (Arr == null ? 0 : Arr.length);
};

String.prototype.format = function (args)
{
    var result = this;
    if (arguments.length > 0)
    {
        if (arguments.length == 1 && typeof (args) == "object")
        {
            for (var key in args)
            {
                if (args[key] != undefined)
                {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else
        {
            for (var i = 0; i < arguments.length; i++)
            {
                if (arguments[i] != undefined)
                {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}
/*
* 除以指定数值后的商
* Arg：除数
* Type：缺省表示不处理结果，U表示向上取整，L表示向下取整
*/
Number.prototype.Divide = function (Arg, Type)
{
    try
    {
        var Rtn = this / Arg;
        switch (Type)
        {
            case "U":
                {
                    Rtn = Math.ceil(Rtn);
                    //                    if (Rtn.indexOf(".") > 0)
                    //                    {
                    //                        Rtn = Number(Rtn.replace(/.[0-9]+/g, "")) + 1;
                    //                    }
                }
                break;
            case "L":
                {
                    //Rtn = Rtn.replace(/.[0-9]+/g, "");
                    Rtn = Math.floor(Rtn);
                }
                break;
            default:
                {
                }
                break;
        }
        return Rtn;
    }
    catch (ex)
    {
        return ex;
    }
}
//数值格式化
Number.prototype.FormatString = function (Format)
{
    var Fmt = Format.split(".");
    var Dcs = Format.match(/0+/g);
    var Dcl = 0;
    if (Dcs.length == 2)
    {
        Dcl = Dcs[1].length;
    }
    var Rst = this.toFixed(Dcl);
    var Vs = Rst.split(".");
    var Bp = Fmt[0].split("").reverse();
    jQuery.extend(true, Bp, Vs[0].split("").reverse());
    if (Vs.length == 2)
    {
        var Ap = Fmt[1].split("");
        jQuery.extend(true, Ap, Vs[1].split(""));
        Rst = Bp.reverse().join("") + "." + Ap.join("");
    }
    else
    {
        Rst = Bp.reverse().join("")
    }
    return Rst
};
//获取数值的小数位数,DOA为近似度，大于0的整数，数值越大越准确
Number.prototype.GetDecimalPlace = function (DOA)
{
    if (jQuery.isNumeric(DOA) && DOA > 0)
    {
        DOA = Math.ceil(DOA);
        var Regx = new RegExp("\.[0-9]*[1-9]0{" + DOA + "}");
        var S = this.toString().match(Regx);
        if (S && S.length > 0)
        {
            return S[0].length - DOA - 1;
        }
        else
        {
            return this.GetDecimalPlace();
        }
    }
    else
    {
        var Str = "" + this;
        if (Str.indexOf(".") > 0)
        {
            return Str.length - Str.indexOf(".") - 1;
        }
        else
        {
            return 0;
        }
    }
};
//克隆日期时间对象
Date.prototype.Clone = function ()
{
    return new Date(this.getTime());
};
/*
* 输出格式化日期字符串
* Format:时间格式
*/
Date.prototype.FormatString = function (Format)
{
    if (Format.length == 0)
    {
        Format = "yyyy-MM-dd HH:mm:ss";
    }
    Format = Format.replace(/yyyy/g, this.getFullYear());
    Format = Format.replace(/yy/g, this.getFullYear().toString().slice(2));
    var MonthStr = this.getMonth() + 1;
    if (String(MonthStr).length == 1)
    {
        MonthStr = "0" + MonthStr;
    }
    Format = Format.replace(/MM/g, MonthStr);
    Format = Format.replace(/M/g, this.getMonth() + 1);
    var DateStr = this.getDate();
    if (String(DateStr).length == 1)
    {
        DateStr = "0" + DateStr;
    }
    Format = Format.replace(/dd/g, DateStr);
    Format = Format.replace(/d/g, this.getDate());
    var HourStr = this.getHours();
    if (String(HourStr).length == 1)
    {
        HourStr = "0" + HourStr;
    }
    Format = Format.replace(/HH/g, HourStr);
    Format = Format.replace(/H/g, this.getHours());
    var MinuteStr = this.getMinutes();
    if (String(MinuteStr).length == 1)
    {
        MinuteStr = "0" + MinuteStr;
    }
    Format = Format.replace(/mm/g, MinuteStr);
    Format = Format.replace(/m/g, this.getMinutes());
    var SecondStr = this.getSeconds();
    if (String(SecondStr).length == 1)
    {
        SecondStr = "0" + SecondStr;
    }
    Format = Format.replace(/ss/g, SecondStr);
    Format = Format.replace(/s/g, this.getSeconds());

    var MillisecondStr = this.getMilliseconds();
    if (String(MillisecondStr).length == 1)
    {
        MillisecondStr = "00" + MillisecondStr;
    }
    if (String(MillisecondStr).length == 2)
    {
        MillisecondStr = "0" + MillisecondStr;
    }
    Format = Format.replace(/SSS/g, MillisecondStr);
    Format = Format.replace(/SS/g, this.getMilliseconds());
    Format = Format.replace(/S/g, this.getMilliseconds());
    return Format;
};
//获取日期的星期几
Date.prototype.GetDayOfWeek = function ()
{
    var Str = "";
    switch (this.getDay())
    {
        case 0:
            {
                Str = "星期日";
            }
            break;
        case 1:
            {
                Str = "星期一";
            }
            break;
        case 2:
            {
                Str = "星期二";
            }
            break;
        case 3:
            {
                Str = "星期三";
            }
            break;
        case 4:
            {
                Str = "星期四";
            }
            break;
        case 5:
            {
                Str = "星期五";
            }
            break;
        case 6:
            {
                Str = "星期六";
            }
            break;
    }
    return Str;
};
//增加指定秒数
Date.prototype.AddSeconds = function (Count)
{
    return new Date(Number(this) + Count * 1000);
};
//增加指定分钟数
Date.prototype.AddMinutes = function (Count)
{
    return new Date(Number(this) + Count * 60000);
};
//增加指定小时数
Date.prototype.AddHours = function (Count)
{
    return new Date(Number(this) + Count * 3600000);
};
//增加指定天数
Date.prototype.AddDays = function (Count)
{
    return new Date(Number(this) + Count * 86400000);
};
//增加指定月数
Date.prototype.AddMonths = function (Count)
{
    var Dt = new Date(this.getFullYear(), this.getMonth() + Count, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
    if ((Dt.getMonth() - 12) % 12 == (this.getMonth() + Count - 12) % 12)
    {
        return Dt;
    }
    else
    {
        return ConvertToDate(Dt.FormatString("yyyy-MM-01 HH:mm:ss"), "yyyy-MM-dd HH:mm:ss").AddDays(-1);
    }
};
//增加指定年数
Date.prototype.AddYears = function (Count)
{
    return new Date(this.getFullYear() + Count, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
};
//获取日期在当年中的第几周
Date.prototype.GetWeekOfYear = function ()
{
    var FDY = new Date(this.getFullYear(), 0, 1);
    return ("" + (((this - FDY) / 86400000 + 13 - FDY.getDay()) / 7)).replace(/\.[0-9]*$/g, "");
};
//获取时间戳（秒数）
Date.prototype.GetTimeStamp = function ()
{
    return Math.floor(this.getTime() / 1000);
};

//把时间字符串转换为Date类型
function ConvertToDate(Value, Format)
{
    if (Format == undefined)
    {
        Format = "yyyy-MM-dd HH:mm:ss";
    }
    var Chars = new Date().FormatString("yyyy/MM/dd HH:mm:ss").split(/[^0-9]/g);
    Value = Value.split(/[^0-9]/g);
    Format = Format.split(/[^yMdHms0-9]/g);
    for (var i = 0, len = Chars.length; i < len; i++)
    {
        if (Format[i])
        {
            switch (Format[i])
            {
                case "yyyy":
                    {
                        Chars[0] = Value[i] || Chars[0];
                    }
                    break;
                case "MM":
                case "M":
                    {
                        Chars[1] = Value[i] || Chars[1];
                    }
                    break;
                case "dd":
                case "d":
                    {
                        Chars[2] = Value[i] || Chars[2];
                    }
                    break;
                case "HH":
                case "H":
                    {
                        Chars[3] = Value[i] || Chars[3];
                    }
                    break;
                case "mm":
                case "m":
                    {
                        Chars[4] = Value[i] || Chars[4];
                    }
                    break;
                case "ss":
                case "s":
                    {
                        Chars[5] = Value[i] || Chars[5];
                    }
                    break;
                default:
                    {
                        Chars[i] = Format[i];
                    }
                    break;
            }
        }
        else
        {
            switch (i)
            {
                case 1:
                case 2:
                    {
                        Chars[i] = "01";
                    }
                    break;
                default:
                    {
                        Chars[i] = "00";
                    }
                    break;
            }
        }
    }

    Chars.splice(5, 0, ":");
    Chars.splice(4, 0, ":");
    Chars.splice(3, 0, " ");
    Chars.splice(2, 0, "/");
    Chars.splice(1, 0, "/");

    return new Date(Chars.join(""));
}

//根据格式化字符串获取日期格式代码
function GetDateType(Format)
{
    return Format.replace(/[^yMdHms]/g, "");
};

Array.prototype.SortNumberFind = function (Target, Compare, Range)
{
    if (this.length == 0)
    {
        return null;
    }
    else
    {
        if (jQuery.isFunction(Compare) == false)
        {
            Compare = function (t, v)
            {
                if (t == v)
                {
                    return "=";
                }
                else if (t > v)
                {
                    return ">";
                }
                else if (t < v)
                {
                    return "<";
                }
            };
        }
        var Idx = { min: 0, max: this.length - 1 };
        var idx = null, val;
        var sort = Compare(this[Idx.min], this[Idx.max]) === "<"; //是否正序
        if (Compare(Target, this[Idx.min]) === "=")
        {
            idx = Idx.min;
        }
        else if (Compare(Target, this[Idx.max]) === "=")
        {
            idx = Idx.max;
        }
        else if (sort && Compare(Target, this[Idx.min]) === ">" && Compare(Target, this[Idx.max]) === "<"
			|| Compare(Target, this[Idx.min]) === "<" && Compare(Target, this[Idx.max]) == ">")
        {
            while (Compare(Target, val) !== "=")
            {
                idx = Math.floor((Idx.min + Idx.max) / 2);
                val = this[idx];
                if (Compare(val, Target) === "<")
                {
                    Idx[sort ? "min" : "max"] = idx;
                }
                else if (Compare(val, Target) === ">")
                {
                    Idx[sort ? "max" : "min"] = idx;
                }
            }
        }
        return idx;
    }
};

//jQuery扩展
jQuery.extend(
{
    GetTemplate: function (fn)
    {
        return fn.toString().replace(/^function\s*\(\s*\)\s*\{\s*\/\*/g, "").replace(/\*\/;?\s*\}$/g, "");
    },
    ImplantTemplate: function (Id, Temp)
    {
        jQuery("head").append("<script id=\"" + Id + "\" type=\"template\">" + Temp + "<\/script>");
    },
    JWS: function (url, data, options)
    {
        var base = ""; // "http://localhost:8080";
        options = jQuery.extend({
            method: 'POST',
            url: base + url,
            data: JSON.stringify(data || {}),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            cache: false
        }, options);

        return jQuery.ajax(options);
    },
    Error: function (Item, Token, Type, Content)
    {
        //alert(Item + "#" + Token + "#" + Type + "#" + Content);
        jQuery(document.body).append("<div id=\"error_message\" style=\"position:absolute; top:100px; right:100px; background-color:red;\">Item: " + Item + "<br/>Token: " + Token + "<br/>Type: " + Type + "<br/>Content: " + Content + "</div>")
        setTimeout(function ()
        {
            jQuery("#error_message").remove();
        }, 3000);

    },
    ImplantStyle: function (Module, Skin, Loaded)
    {
        var Config = jQuery(document).data(Module);
        if (!Config)
        {
            var Script = jQuery("script[src*='/" + Module + ".js']");
            if (Script.length == 0)
            {
                Script = jQuery("script[src^='" + Module + ".js']");
            }
            var Regx = new RegExp(Module + "\.js.*$");
            var Path = Script.attr("src").replace(Regx, "");
            if (!Skin)
            {
                Skin = Script.attr("skin") || "Default";
            }

            Config = { Skin: Skin, Path: Path };

            jQuery("<link href=\"" + Path + "Skins/" + Skin + "/skin.css\" rel=\"stylesheet\" type=\"text/css\" />").insertAfter(Script)
            .bind("load", function ()
            {
                if (jQuery.isFunction(Loaded))
                {
                    Loaded(Config);
                }
            });

            jQuery(document).data(Module, Config);
        }
        return Config;
    },
    Tabindex: function (Options)
    {
        jQuery("[tabindex]").each(function (i, ele)
        {
            if (jQuery(ele).attr("tabindex") > 0)
            {
                jQuery(ele).keypress(function (Evt)
                {
                    if (Evt.which == 13)
                    {
                        if (jQuery(this).attr("submit") === "true")
                        {
                            //Finally
                            if (jQuery.isFunction(Options.Finally))
                            {
                                Options.Finally();
                            }
                        }
                        else if (Evt)
                        {
                            //Next
                            jQuery("[tabindex=" + (Number(jQuery(this).attr("tabindex")) + 1) + "]").focus();
                        }
                    }
                });
            }
        });
    },
    Loader: function (Url, Params, Success, Error)
    {
        if (Error === "debug")
        {
            Success({});
        }
        else
        {
            jQuery.ajax({
                type: "POST",
                data: JSON.stringify(Params),
                url: Url,
                contentType: "application/json",
                dataType: "json",
                success: function (Result)
                {
                    if (jQuery.isFunction(Success))
                    {
                        if (Result.Code == 0)
                        {
                            Success(Result.Response);
                        }
                        else
                        {
                            if (jQuery.isFunction(Error))
                            {
                                Error(Result.Message);
                            }
                        }
                    }
                },
                error: function (ex)
                {
                    if (jQuery.isFunction(Error))
                    {
                        Error("请求发生异常（异常代码：" + ex.status + "）");
                    }
                }
            });
        }
    },
    InArray: function (List, Value, Compare)
    {
        if (jQuery.isArray(List) && List.length > 0)
        {
            if (jQuery.isFunction(Compare) == false)
            {
                Compare = function (a, b) { return a === b; };
            }

            var Result = -1;

            for (var i = 0, len = List.length; i < len; i++)
            {
                if (Compare(List[i], Value))
                {
                    Result = i;
                    break;
                }
            }

            return Result;
        }
        else
        {
            return -1;
        }
    }
});


/*
* 日期格式化日期字符串转时间戳
* Format:时间格式
*/
String.prototype.GetTime = function (format)
{
    if ((format || "").length == 0)
    {
        format = "yyyy-MM-dd HH:mm:ss";
    }

    var dp = { y: 0, M: 0, d: 1, H: 0, m: 0, s: 0 },
	    str = this.replace(/[^yMdHms0-9]+/g, ",").split(",");
    format = format.replace(/[^yMdHms0-9]+/g, ",").split(",");

    for (var i = 0; i < format.length; i++)
    {
        if (format[i].indexOf("y") > -1)
        {
            if (format[i].length == 2)
            {
                dp.y = parseInt(str[i] || 0, 10) + parseInt(new Date().getFullYear() / 100, 10) * 100;
            } else
            {
                dp.y = parseInt(str[i] || 0, 10);
            }
        }
        if (format[i].indexOf("M") > -1)
        {
            dp.M = parseInt(str[i] || 1, 10) - 1;
        }
        if (format[i].indexOf("d") > -1)
        {
            dp.d = parseInt(str[i] || 1, 10);
        }
        if (format[i].indexOf("H") > -1)
        {
            dp.H = parseInt(str[i] || 0, 10);
        }
        if (format[i].indexOf("m") > -1)
        {
            dp.m = parseInt(str[i] || 0, 10);
        }
        if (format[i].indexOf("s") > -1)
        {
            dp.s = parseInt(str[i] || 0, 10);
        }
    }

    var result = parseFloat(new Date(dp.y, dp.M, dp.d, dp.H, dp.m, dp.s).getTime()) / 1000;
    return result < 0 ? null : result;
};

String.prototype.LeftPad = function (n, p)
{
    var num = this;
    var len = num.toString().length;
    while (len < n)
    {
        num = p + num;
        len++;
    }
    return num;
};

if (window.Highcharts)
{
    window.ChartColors =
    [
    ];
    window.Highcharts.setOptions({
        global: { useUTC: false },
        lang: { rangeSelectorZoom: "缩放" },
        credits: { enabled: false },
        //colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        //colors: ['#fe623b', '#1e9cff', '#15cf3c', '#fe6854', '#62cb4e', '#5a9cdc', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        colors: ["#fe623b", "#1e9cff", "#15cf3c", "#b67b69", "#9fc52b", "#d059e6", "#45e9eb", "#e2d501", "#6483b7", "#00812d", "#cc9000", "#aaaaaa", "#7859ff", "#ffc790", "#01b4ba", "#ffadd0", "#6e394f", "#816a00"],
        chart: {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
          [0, 'rgb(255, 255, 255)'],
          [1, 'rgb(240, 240, 255)']
        ]
            },
            borderWidth: 2,
            plotBackgroundColor: 'rgba(255, 255, 255, .9)',
            plotShadow: true,
            plotBorderWidth: 1
        },
        plotOptions:
		{
		    series:
			{
			    lineWidth: 2,
			    marker: { enabled: false }
			}
		},
        title: {
            style: {
                color: '#000',
                font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#666666',
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        xAxis: {
            gridLineWidth: 1,
            lineColor: '#000',
            tickColor: '#000',
            tickLength: 6,
            labels: {
                style: {
                    color: '#000',
                    font: '11px Trebuchet MS, Verdana, sans-serif'
                }
            },
            title: {
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        },
        yAxis: {
            minorTickInterval: 'auto',
            lineColor: '#000',
            lineWidth: 1,
            tickWidth: 1,
            tickColor: '#000',
            tickLength: 6,
            labels: {
                style: {
                    color: '#000',
                    font: '11px Trebuchet MS, Verdana, sans-serif'
                }
            },
            title: {
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                }
            }
        },
        legend: {
            itemStyle: {
                font: '9pt Trebuchet MS, Verdana, sans-serif',
                color: 'black'

            },
            itemHoverStyle: {
                color: '#039'
            },
            itemHiddenStyle: {
                color: 'gray'
            }
        },
        labels: {
            style: {
                color: '#99b'
            }
        },
        exporting: { enabled: false },
        navigation: {
            buttonOptions: {
                theme: {
                    stroke: '#CCCCCC'
                }
            }
        }
    });

}

//localStorage
jQuery.extend(true, HD,
{
    LocalStorage:
	{
	    Get: function (Key, Default)
	    {
	        if (Key.length > 0 && window["localStorage"])
	        {
	            var Result = Proxy.Json.ToObject(window["localStorage"].getItem(Key));
	            if (Result && Result.Expiress > (new Date().getTime()))
	            {
	                return Result.Data;
	            }
	            else if (jQuery.isFunction(Default))
	            {
	                return Default();
	            }
	            else
	            {
	                return Default;
	            }
	        }
	        else
	        {
	            return null;
	        }
	    },
	    Set: function (Key, Value, Expiress)
	    {
	        if (Key && window["localStorage"])
	        {
	            this.Remove(Key);
	            window["localStorage"].setItem(Key, Proxy.Json.ToString({ Data: Value, Expiress: (new Date().getTime() + Expiress * 1000) }));
	        }
	    },
	    Remove: function (Key)
	    {
	        if (Key && window["localStorage"])
	        {
	            window["localStorage"].removeItem(Key);
	        }
	    },
	    Clear: function ()
	    {
	        if (window["localStorage"])
	        {
	            window["localStorage"].clear();
	        }
	    }
	}
});

$.fn.viewable = function ()
{
    var viewport = {};
    viewport.top = $(this).parent().scrollTop();
    viewport.bottom = viewport.top + $(this).parent().height();
    var bounds = {};
    bounds.top = this.offset().top - this.parent().offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom));
};

//EasyUI datagrid Formatter
//时间戳显示
function TimeFormatter(value, row, index)
{
    if (value && typeof value == "number") return new Date(value * 1000).FormatString('yyyy-MM-dd HH:mm');
    else if (value == 0) return "";
    else return value;
}
function DateFormatter(value, row, index)
{
    if (value && typeof value == "number") return new Date(value * 1000).FormatString('yyyy-MM-dd');
    else return value;
}
function MonthFormatter(value, row, index)
{
    if (value && typeof value == "number") return "&nbsp;" + new Date(value * 1000).FormatString('yyyy-MM');
    else return value;
}
function YearFormatter(value, row, index)
{
    if (value && typeof value == "number") return new Date(value * 1000).FormatString('yyyy');
    else return value;
}


function isArray(obj)
{
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function ImageFormatter(value, row, index)
{
    if (value)
    {
        if (isArray(value))
        {
            var vs = [];
            for (var i = 0; i < value.length; i++)
            {
                vs.push(Link(value[i]));
            }
            return vs.join(",");
        } else
        {
            return Link(value);
        }
    } else
    {
        return "";
    }
    function Link(v)
    {
        return "<a href=\".." + v + "\" target=\"_blank\" style='color: #0000ff; text-decoration: underline; cursor: pointer;'>查看</a>";
    }
}

function IntFormatter(value, row, index)
{
    if (value == 0) { return value; }
    if (value && value.toString().length > 0)
    {
        if (!isNaN(Number(value)))
        {
            return Math.round(Number(value), 0);
        } else
        {
            return value;
        }
    } else
    {
        return "";
    }
}

function Float2Formatter(value, row, index)
{
    if (value == 0) { return value; }
    if (value && value.toString().length > 0)
    {
        if (!isNaN(Number(value)))
        {
            return Math.round(Number(value)*100, 2)/100;
        } else
        {
            return value;
        }
    } else
    {
        return "";
    }
}

function SetCookie(c_name, value, expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function GetCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return "";
}

function DelCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

function SingleFormatter(Id,Name,Sn) {
        return "<a onclick=\"window.top.ToSingle('" + Id + "', '" + Name + "','" + Sn + "');\" class='single-analysis-link'>" + Name + "</a>";
    }

function ToSingle(Id, Name, Sn, dataType)
{
    var href = '/scada/analysis.html?id=' + Id;

    if (dataType != undefined) { href += '&datatypes=' + dataType; }
    if (Sn != undefined) { href += '&sn=' + Sn; }

    Open(href, Name);
};

function Open(Url, Name)
{
    if (Name && Url.indexOf("?") < 0) Url += "?";

    try
    {
        window.top.location.hash = '#!' + Url + (Name ? "&_title=" + encodeURIComponent(Name) : "");
    } catch (e)
    {
        try
        {
            ShowDialog({ Title: Name, Url: Url, Height: $(window).height() - 80, Width: $(window).width() - 80 });
        } catch (ee)
        {
            window.location.href = Url + (Name ? "&_title=" + encodeURIComponent(Name) : "");
        }
    }
}

function getQuery(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function ToCar(nm, type, ctype, dep, driver, phone, pos)
{
    if (pos)
    {
        ShowDialog({
            Title: "车辆位置",
            Url: "/static/spread/index.html?sys=report" + "&pos=" + pos + "&type=" + type + "&nm=" + encodeURI(nm) + "&ctype=" + encodeURI(ctype) + "&dep=" + encodeURI(dep) + "&driver=" + encodeURI(driver) + "&phone=" + phone,
            Height: 450,
            Width: 800
        });
    }
}

function OpenEx(url, name)
{
    var path = url.split("?")[0];
    var $iframe = $("iframe[id^='ifm_customize_'][src^='" + path + "']:first");
    if ($iframe.length == 0)
    {
        Open(url, name, false);
    } else
    {
        if (name && url.indexOf("?") < 0)
        {
            url += "?";
        }
        var id = $iframe.attr("src", url + (name ? "&_title=" + encodeURIComponent(name) : "")).attr("id").replace("ifm_", "");
        $("#layout_head div.history_container").find("span[label_id='" + id + "']").find("a").text(name).trigger("click");
    }
}

function Dialog(Config, Arguments, Callback, Params)
{

    var functor = window.ShowDialog;

    try
    {
        functor = window.top.ShowDialog;

        if (Config && Config['Url'] && Config['Url'].startsWith("."))
        {

            $("<a href='" + Config['Url'] + "' style='display:none'>x</a>").each(function ()
            {
                Config['Url'] = this.href;
            });
        }

        if (window.location.port != window.top.location.port)
        {
            functor = window.ShowDialog;
        }

    } catch (e)
    {
    }


    functor(Config, Arguments, Callback, Params);
}

function getUrlParam(key)
{

    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var search = window.location.hash.indexOf("#!") == 0 ? window.location.hash.substring(2) : window.location.search;
    search = search.substring(search.indexOf("?"));
    var r = search.substring(1).match(reg);

    if (r != null) return r[2]; return null;
}

function unixTime(time)
{
    var now = new Date(time);
    var hour = now.getHours();
    var minute = now.getMinutes();
    return hour * 60 + minute;
}

function getField(Object, Field)
{
    var fieldRegexp = new RegExp("\\.|\\[|\\]\\.");
    if (fieldRegexp.test(Field))
    {
        var F = Field.split(fieldRegexp)[0];
        var Cur = Object[F];
        if (Cur)
        {
            return getField(Cur, Field.replace(new RegExp("^" + F + "(\\.|\\[|\\]\\.)"), ""));
        }
        else
        {
            return null;
        }
    }
    else if (Object && Object.hasOwnProperty(Field))
    {
        return Object[Field];
    } else
    {
        return '';
    }
}

var HDatetimePicker = {
    Register: function (Obj)
    {
        var OperHtml = '<div class="operator"><div class="prev v1"></div><div class="next v1"></div></div>';
        if (!Obj) Obj = $(".HD-DatePicker")
        Obj.after(OperHtml);

        Obj.next("div.operator").find("div").unbind("click").bind("click", function ()
        {
            //Obj.parents(".HD-Datetime-Range").find("div.operator>div").unbind("click").bind("click", function() {
            var Ipt = $(this).parent().prev("input.value");

            var Val = Ipt.val();
            if (!Val || Val.length == 0) return

            var Len = Val.length;
            var Format = "yyyy-MM-dd";
            if (Len == 4) Format = "yyyy";
            else if (Len == 7) Format = "yyyy-MM";
            else if (Len == 13) Format = "yyyy-MM-dd HH";
            else if (Len == 16) Format = "yyyy-MM-dd HH:mm";
            else if (Len == 19) Format = "yyyy-MM-dd HH:mm:ss";
            else Format = "yyyy-MM-dd";

            var Crt = ConvertToDate(Val, Format);
            var Offset = -1;
            if ($(this).hasClass("prev"))
            {
                Offset = 1;
            }
            switch (GetDateType(Format).split("").reverse()[0])
            {
                case "y":
                    {
                        Crt = Crt.AddYears(Offset);
                    }
                    break;
                case "M":
                    {
                        Crt = Crt.AddMonths(Offset);
                    }
                    break;
                case "d":
                    {
                        Crt = Crt.AddDays(Offset);
                    }
                    break;
                case "H":
                    {
                        Crt = Crt.AddHours(Offset);
                    }
                    break;
                case "m":
                case "s":
                    {
                        Crt = Crt.AddMinutes(Offset);
                    }
                    break;
            }
            Ipt.val(Crt.FormatString(Format));
        });
    }
};

function StationSelector(Target, Options, Value, Callback)
{
    if (!Target.data("handler"))
    {
        Target.addClass("tree_selector loading").width(Target.width() - 16).css("padding-right", "18px").each(function (i, ele)
        {
            ele.Set = function (Value)
            {
                jQuery(this).data("data", Value);
            };
        });
        jQuery.ajax({
            type: "POST",
            data: JSON.stringify(Options.TreeParams || { EndType: (Options.EndType || "L"), Type: Options.STypes, DataTypes: Options.DTypes, Equipments: Options.Equipments }),
            url: (Options.TreeUrl || "/hd/station/tree.json"),
            contentType: "application/json",
            dataType: "json",
            success: function (Result)
            {
                if (Result.Code == 0)
                {
                    var CreateIndex = function (All, Node)
                    {
                        All[Node.ObjId] = Node;
                        if (Node && Node.Children && Node.Children.length > 0)
                        {
                            for (var i = 0, Arr = Node.Children, len = Arr.length; i < len; i++)
                            {
                                if (Arr[i].Type == "S")
                                {
                                    Arr[i].Name += "(" + Arr[i].ObjId + ")";
                                    Arr[i].Station = Node.Name;
                                    Arr[i].StationId = Node.ObjId;
                                }
                                CreateIndex(All, Arr[i]);
                            }
                        }
                    };

                    var Handler =
                    {
                        Data: [Result.Response],
                        All: {}
                    };

                    CreateIndex(Handler.All, Result.Response);

                    Target.data("handler", Handler);

                    if (Options.Editable)
                    {
                        Target.dblclick(function (Evt)
                        {
                            var Tgt = jQuery(this);
                            ShowDialog({ Title: (Options.DlgTitle || "站点选择"), Url: "/static/Scripts/StationSelector/dlgSelector.html", Width: 580, Height: 400 },
	                        { Placeholder: Options.Placeholder || "搜索站点", AutoCompleteUrl: Options.AutoCompleteUrl, Settings: Options.Settings, Handler: Tgt.data("handler"), Records: Tgt.data("data") },
	                        function (Result)
	                        {
	                            if (Result != null)
	                            {
	                                if (Result)
	                                {
	                                    if (Options.Settings.check.enable)
	                                    {
	                                        var Values = [];
	                                        var Names = [];
	                                        for (var i = 0, len = Result.length; i < len; i++)
	                                        {
	                                            Values.push(Result[i].Value);
	                                            Names.push((Options.EndType == "S" ? Result[i].Station + "_" : "") + Result[i].Name);
	                                        }
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback(Values, Names);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", Values);
	                                            Tgt.val(Names.join(","));
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                    else
	                                    {
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback(Result.Value, (Options.EndType == "S" ? Result.Station + "_" : "") + Result.Name);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", Result.Value);
	                                            Tgt.val((Options.EndType == "S" ? Result.Station + "_" : "") + Result.Name);
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                }
	                                else
	                                {
	                                    if (Options.Settings.check.enable)
	                                    {
	                                        var Values = [];
	                                        var Names = [];
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback([], []);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", []);
	                                            Tgt.val("");
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                    else
	                                    {
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback("", "");
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", "");
	                                            Tgt.val("");
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                }
	                            }
	                        });
                        });
                    }
                    else
                    {
                        Target.prop("readonly", "readonly").click(function (Evt)
                        {
                            var Tgt = jQuery(this);
                            ShowDialog({ Title: (Options.DlgTitle || "站点选择"), Url: "/static/Scripts/StationSelector/dlgSelector.html", Width: 580, Height: 400 },
	                        { Placeholder: Options.Placeholder || "搜索站点", AutoCompleteUrl: Options.AutoCompleteUrl, Settings: Options.Settings, Handler: Tgt.data("handler"), Records: Tgt.data("data") },
	                        function (Result)
	                        {
	                            if (Result != null)
	                            {
	                                if (Result)
	                                {
	                                    if (Options.Settings.check.enable)
	                                    {
	                                        var Values = [];
	                                        var Names = [];
	                                        for (var i = 0, len = Result.length; i < len; i++)
	                                        {
	                                            Values.push(Result[i].Value);
	                                            Names.push((Options.EndType == "S" ? Result[i].Station + "_" : "") + Result[i].Name);
	                                        }
	                                        Tgt.data("nodes", Result);
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback(Values, Names);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", Values);
	                                            Tgt.val(Names.join(","));
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                    else
	                                    {
	                                        Tgt.data("nodes", Result);
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback(Result.Value, (Options.EndType == "S" ? Result.Station + "_" : "") + Result.Name);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", Result.Value);
	                                            Tgt.val((Options.EndType == "S" ? Result.Station + "_" : "") + Result.Name);
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                }
	                                else
	                                {
	                                    if (Options.Settings.check.enable)
	                                    {
	                                        var Values = [];
	                                        var Names = [];
	                                        Tgt.data("nodes", null);
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback([], []);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", []);
	                                            Tgt.val("");
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                    else
	                                    {
	                                        Tgt.data("nodes", null);
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback("", "");
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", "");
	                                            Tgt.val("");
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                }
	                            }
	                        });
                        });
                    }

                    Target.removeClass("loading").trigger("loaded", "success");

                    Target.each(function (i, ele)
                    {
                        ele.Set = function (Value)
                        {
                            jQuery(this).val("").removeData("data").data("data", Value);
                            if (Value != undefined && Value != null)
                            {
                                if (Options.Settings.check.enable)
                                {
                                    var Names = [];
                                    for (var i = 0, All = jQuery(this).data("handler").All, len = Value.length; i < len; i++)
                                    {
                                        var Node = All[Value[i]];
                                        if (Node)
                                        {
                                            Names.push((Node.Type == "S" ? Node.Station + "_" : "") + Node.Name);
                                        }
                                    }

                                    jQuery(this).val(Names.join(","));
                                }
                                else
                                {
                                    var Node = jQuery(this).data("handler").All[Value];
                                    if (Node)
                                    {
                                        jQuery(this).val((Node.Type == "S" ? Node.Station + "_" : "") + Node.Name);
                                    }
                                    else if (Options.Editable)
                                    {
                                        jQuery(this).removeData("data").val(Value);
                                    }
                                }
                            }
                        };
                    });

                    Target.each(function (i, ele)
                    {
                        ele.Get = function ()
                        {
                            var Value = jQuery(this).data("data");
                            if (!Value && Options.Editable)
                            {
                                Value = jQuery(this).val();
                            }
                            return Value;
                        };
                    });

                    Target.each(function (i, ele)
                    {
                        var Val = jQuery(ele).data("data");
                        if (Val == undefined && !!Value)
                        {
                            Val = Value;
                        }
                        if (Val)
                        {
                            ele.Set(Val);
                        }
                    });

                    if (Options.AutoShow)
                    {
                        Target.trigger(Options.Editable ? "dblclick" : "click");
                    }
                }
            },
            error: function (ex)
            {
                Target.removeClass("loading").trigger("loaded", "failure", ex);
            }
        });
    }
}

function TreeSelector(Target, Options, Value, Callback)
{
    if (!Target.data("handler"))
    {
        Target.addClass("tree_selector loading").width(Target.width() - 16).css("padding-right", "18px").each(function (i, ele)
        {
            ele.Set = function (Value)
            {
                jQuery(this).data("data", Value);
            };
        });
        jQuery.ajax({
            type: "POST",
            data: JSON.stringify(Options.TreeParams || { EndType: (Options.EndType || "L") }),
            url: (Options.TreeUrl || "/hd/user/tree.json"),
            contentType: "application/json",
            dataType: "json",
            success: function (Result)
            {
                if (Result.Code == 0)
                {
                    var CreateIndex = function (All, Node)
                    {
                        All[Node.ObjId] = Node;
                        if (Node && Node.Children && Node.Children.length > 0)
                        {
                            for (var i = 0, Arr = Node.Children, len = Arr.length; i < len; i++)
                            {
                                CreateIndex(All, Arr[i]);
                            }
                        }
                    };

                    var Handler =
                    {
                        Data: [Result.Response],
                        All: {}
                    };

                    CreateIndex(Handler.All, Result.Response);

                    Target.data("handler", Handler);

                    if (Options.Editable)
                    {
                        Target.dblclick(function (Evt)
                        {
                            var Tgt = jQuery(this);
                            ShowDialog({ Title: (Options.DlgTitle || "树形选择"), Url: "/static/Scripts/TreeSelector/dlgSelector.html", Width: 580, Height: 400 },
	                        { Placeholder: Options.Placeholder || "搜索站点", AutoCompleteUrl: Options.AutoCompleteUrl, Settings: Options.Settings, Handler: Tgt.data("handler"), Records: Tgt.data("data") },
	                        function (Result)
	                        {
	                            if (Result != null)
	                            {
	                                if (Result)
	                                {
	                                    if (Options.Settings.check.enable)
	                                    {
	                                        var Values = [];
	                                        var Names = [];
	                                        for (var i = 0, len = Result.length; i < len; i++)
	                                        {
	                                            Values.push(Result[i].Value);
	                                            Names.push(Result[i].Name);
	                                        }
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback(Values, Names, Result);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", Values);
	                                            Tgt.val(Names.join(","));
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                    else
	                                    {
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback(Result.Value, Result.Name, Result);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", Result.Value);
	                                            Tgt.val(Result.Name);
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                }
	                                else
	                                {
	                                    if (Options.Settings.check.enable)
	                                    {
	                                        var Values = [];
	                                        var Names = [];
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback([], []);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", []);
	                                            Tgt.val("");
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                    else
	                                    {
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback("", "");
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", "");
	                                            Tgt.val("");
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                }
	                            }
	                        });
                        });
                    }
                    else
                    {
                        Target.prop("readonly", "readonly").click(function (Evt)
                        {
                            var Tgt = jQuery(this);
                            ShowDialog({ Title: (Options.DlgTitle || "树形选择"), Url: "/static/Scripts/TreeSelector/dlgSelector.html", Width: 580, Height: 400 },
	                        { Placeholder: Options.Placeholder || "搜索站点", AutoCompleteUrl: Options.AutoCompleteUrl, AutoCompleteParams: Options.AutoCompleteParams, Settings: Options.Settings, Handler: Tgt.data("handler"), Records: Tgt.data("data") },
	                        function (Result)
	                        {
	                            if (Result != null)
	                            {
	                                if (Result)
	                                {
	                                    if (Options.Settings.check.enable)
	                                    {
	                                        var Values = [];
	                                        var Names = [];
	                                        for (var i = 0, len = Result.length; i < len; i++)
	                                        {
	                                            Values.push(Result[i].Value);
	                                            Names.push(Result[i].Name);
	                                        }
	                                        Tgt.data("nodes", Result);
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback(Values, Names, Result);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", Values);
	                                            Tgt.val(Names.join(","));
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                    else
	                                    {
	                                        Tgt.data("nodes", Result);
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback(Result.Value, Result.Name, Result);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", Result.Value);
	                                            Tgt.val(Result.Name);
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                }
	                                else
	                                {
	                                    if (Options.Settings.check.enable)
	                                    {
	                                        var Values = [];
	                                        var Names = [];
	                                        Tgt.data("nodes", null);
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback([], []);
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", []);
	                                            Tgt.val("");
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                    else
	                                    {
	                                        Tgt.data("nodes", null);
	                                        if (jQuery.isFunction(Callback))
	                                        {
	                                            Callback("", "");
	                                        }
	                                        else
	                                        {
	                                            Tgt.data("data", "");
	                                            Tgt.val("");
	                                            Tgt.trigger("change");
	                                        }
	                                    }
	                                }
	                            }
	                        });
	                    });
                    }

                    Target.removeClass("loading").trigger("loaded", "success");

                    Target.each(function (i, ele)
                    {
                        ele.Set = function (Value)
                        {
                            jQuery(this).val("").removeData("data").data("data", Value);
                            if (Value != undefined && Value != null)
                            {
                                if (Options.Settings.check.enable)
                                {
                                    var Names = [];
                                    for (var i = 0, All = jQuery(this).data("handler").All, len = Value.length; i < len; i++)
                                    {
                                        var Node = All[Value[i]];
                                        if (Node)
                                        {
                                            Names.push(Node.Name);
                                        }
                                    }
                                    jQuery(this).val(Names.join(","));
                                }
                                else
                                {
                                    var Node = jQuery(this).data("handler").All[Value];
                                    if (Node)
                                    {
                                        jQuery(this).val(Node.Name);
                                    }
                                    else if (Options.Editable)
                                    {
                                        jQuery(this).removeData("data").val(Value);
                                    }
                                }
                            }
                        };
                    });

                    Target.each(function (i, ele)
                    {
                        ele.Get = function ()
                        {
                            var Value = jQuery(this).data("data");
                            if (!Value && Options.Editable)
                            {
                                Value = jQuery(this).val();
                            }
                            return Value;
                        };
                    });

                    Target.each(function (i, ele)
                    {
                        var Val = jQuery(ele).data("data");
                        if (Val == undefined && !!Value)
                        {
                            Val = Value;
                        }
                        if (Val)
                        {
                            ele.Set(Val);
                        }
                    });

                    if (Options.AutoShow)
                    {
                        Target.trigger(Options.Editable ? "dblclick" : "click");
                    }
                }
            },
            error: function (ex)
            {
                Target.removeClass("loading").trigger("loaded", "failure", ex);
            }
        });
    }
}

jQuery.ImplantTemplate("selector_temp", jQuery.GetTemplate(function ()
{
    /*
    <div class="selector_button">
    <div class="selector">高级查询对象管理<div class="mask"></div></div>
    <div class="template"></div>
    <div class="templates">
    {{include "selector_temp_items"}}
    </div>
    </div>
    */
}));

jQuery.ImplantTemplate("selector_temp_items", jQuery.GetTemplate(function ()
{
    /*
    {{each rows as r i}}
    <div class="item" title="{{r.name}}">{{r.name}}</div>
    {{/each}}
    */
}));

function SelectorButton(Ele, ShowSelector, Callback, LSN, AutoShow, AutoQuery)
{
    var Cb = Callback;
    Callback = function (Result)
    {
        //模板点击次数记录
        if ("count" in Result)
        {
            Result.count += 1;
        }
        else
        {
            Result.count = 1;
        }
        jQuery.Loader("/biz/selectortemplate/update.json", { record: Result });

        Cb(Result.value);
    };

    var CID, UID, CODE;

    try
    {
        CID = top.GCtx.customer._id;
        UID = top.GCtx.user._id;
        CODE = LSN || (top.mh ? top.mh.History.Current.Item.Val : top.location.pathname);
    } catch (e)
    {
        CID = GCtx.customer._id;
        UID = GCtx.user._id;
        CODE = LSN || location.pathname;
    }


    jQuery.Loader("/biz/selectortemplate/query.json",
	{
	    conditions:
		[
			{ Field: "cid", Operate: "=", Value: CID, Relation: "and" },
            { Field: "uid", Operate: "=", Value: UID, Relation: "and" },
			{ Field: "code", Operate: "=", Value: CODE, Relation: "and" }
		],
	    order: [{ Field: "selected", Type: true }, { Field: "count", Type: true}],
	    index: 1,
	    size: 999
	}, function (Result)
	{
	    Ele.each(function (i, ele)
	    {
	        var Btn = jQuery(template("selector_temp", Result));
	        jQuery(ele).replaceWith(Btn);
	        Btn.find("div.templates>div.item").click(function (Evt)
	        {
	            Btn.removeClass("show");
	            Callback(jQuery(this).data("data"));
	        });
	        Btn.find("div.selector").click(function (Evt)
	        {
	            //弹出对话框
	            jQuery(this).parent().removeClass("show");
	            ShowSelector.call(jQuery(ele));
	        });
	        Btn.find("div.template").click(function (Evt)
	        {
	            var This = this;
	            if (Btn.hasClass("show"))
	            {
	                Btn.removeClass("show");
	            }
	            else
	            {
	                Btn.addClass("show");
	                var Offset = jQuery(This).parent().offset();
	                Offset.top += jQuery(This).parent().height() + 2;
	                Btn.find("div.templates").offset(Offset);
	                jQuery.Loader("/biz/selectortemplate/query.json",
	                {
	                    conditions:
		                [
			                { Field: "cid", Operate: "=", Value: CID, Relation: "and" },
                            { Field: "uid", Operate: "=", Value: UID, Relation: "and" },
			                { Field: "code", Operate: "=", Value: CODE, Relation: "and" }
		                ],
	                    order: [{ Field: "selected", Type: true }, { Field: "count", Type: true}],
	                    index: 1,
	                    size: 999
	                }, function (Result)
	                {
	                    Btn.find("div.templates").html(template("selector_temp_items", Result)).find("div.item").click(function (Evt)
	                    {
	                        Btn.removeClass("show");
	                        Callback(jQuery(this).data("data"));
	                    }).each(function (i, ele)
	                    {
	                        jQuery(ele).data("data", Result.rows[i]);
	                    });
	                });
	            }
	        });
	        Btn.find("div.templates").mouseleave(function (Evt)
	        {
	            Btn.removeClass("show");
	        });

	        if (AutoQuery == true || Proxy.GetUrlParam("query") == "auto")
	        {
	            //get default
	            var Dft = null;
	            for (var j = 0, Arr = Result.rows, len = Arr.length; j < len; j++)
	            {
	                if (Arr[j].selected == 1)
	                {
	                    Dft = Arr[j];
	                    break;
	                }
	            }
	            if (Dft)
	            {
	                Callback(Dft);
	            }
	            else if (Result.rows.length > 0)
	            {
	                Callback(Result.rows[0]);
	            }
	            else if (AutoShow !== false)
	            {
	                ShowSelector();
	            }
	            else
	            {
	                Cb(null);
	            }
	        }
	        else if (AutoShow !== false)
	        {
	            ShowSelector();
	        }
	    });
	});
}

function DlgForm(title, form, values, callback, params)
{
    var config = { Title: title, Url: "/biz/dlgCommonForm.html", Width: 400, Height: 160, CloseButton: true };
    Dialog(config, { Form: form, Values: values, Param: params || {} }, function (result)
    {
        callback(result);
    });
}

ExportReport2Excel = function (V, Result, ExportName, Footer)
{

    var FileName = ((V && V.Object && V.Object.ExportName) || ExportName) + new Date().FormatString("yyyy-MM-dd");
    var Content = ["<table style='font-family: 宋体;font-size:16px;'>"];
    //生成表头
    //var Fields = V.Grid.Element.datagrid("getColumnFields", true);
    //for(var i = 0, Arr = V.Grid.Element.datagrid("getColumnFields", false), len = Arr.length; i < len; i++)
    //{
    //    Fields.push(Arr[i]);
    //}


    var Fields = V.Grid.Element.datagrid("getColumnFields", true);
    var Opts = V.Grid.Element.datagrid("options");
    for (var i = 0, All = V.Column, Arr = V.Grid.Element.datagrid("getColumnFields", false), len = Arr.length; i < len; i++)
    {
        Fields.push(Arr[i]);
    }

    //    for(var i=0,Arr=V.Grid.Element.datagrid('getColumnFields',false),len=Arr.length;i<len;i++)
    //    {
    //    	
    //    }

    //    var Fields = [];
    //    var Opts = V.Grid.Element.datagrid("options");
    //    for(var i = 0, FR = Opts.frozenColumns, R = Opts.columns, len = FR.length > R.length ? FR.length : R.length; i < len; i++)
    //    {
    //        //锁定列
    //        if(i < FR.length)
    //        {
    //            for(var j = 0, Cells = FR[i], lenj = Cells.length; j < lenj; j++)
    //            {
    //                if(!Cells[j].hidden&&Cells[j]["field"])
    //                {
    //                	Fields.push(Cells[j]["field"]);
    //                }
    //            }
    //        }
    //        //非锁定列
    //        if(i < R.length)
    //        {
    //            for(var j = 0, Cells = R[i], lenj = Cells.length; j < lenj; j++)
    //            {
    //                if(!Cells[j].hidden&&Cells[j]["field"])
    //                {
    //                	Fields.push(Cells[j]["field"]);
    //                }
    //            }
    //        }
    //    }

    var Field = {};
    for (var i = 0, Arr = (V.Object.Properties || V.Object.Propertys), len = Arr.length; i < len; i++)
    {
        Field[Arr[i].Field] = Arr[i].DataType;
    }

    Content.push("<tr>");
    Content.push("<td style=\"border:solid 0.5pt #000000;text-align:center;height:30px;\" rowspan=\"");
    Content.push(1);
    Content.push("\" colspan=\"");
    Content.push(Fields.length);
    Content.push("\" >&nbsp;");
    Content.push(V.Object.ExportName || ExportName);
    Content.push("</td>");
    Content.push("</tr>");

    var DataColumns = {};
    for (var i = 0, FR = Opts.frozenColumns, R = Opts.columns, len = FR.length > R.length ? FR.length : R.length; i < len; i++)
    {
        Content.push("<tr>");
        //锁定列
        if (i < FR.length)
        {
            for (var j = 0, Cells = FR[i], lenj = Cells.length; j < lenj; j++)
            {
                if (!Cells[j].hidden)
                {
                    Content.push("<td style=\"border:solid 0.5pt #000000;\" rowspan=\"");
                    Content.push(Cells[j].rowspan);
                    Content.push("\" colspan=\"");
                    Content.push(Cells[j].colspan);
                    Content.push("\" >&nbsp;");
                    Content.push(Cells[j].title);
                    Content.push("</td>");

                    if (Cells[j]["datatype"] && Cells[j]["datatype"] == "number")
                    {
                        DataColumns[Cells[j]["field"]] = Cells[j];
                    }
                }
            }
        }
        //非锁定列
        if (i < R.length)
        {
            for (var j = 0, Cells = R[i], lenj = Cells.length; j < lenj; j++)
            {
                if (!Cells[j].hidden)
                {
                    Content.push("<td style=\"border:solid 0.5pt #000000;\" rowspan=\"");
                    Content.push(Cells[j].rowspan);
                    Content.push("\" colspan=\"");
                    Content.push(Cells[j].colspan);
                    Content.push("\" >&nbsp;");
                    Content.push(Cells[j].title);
                    Content.push("</td>");

                    if (Cells[j]["datatype"] && Cells[j]["datatype"] == "number")
                    {
                        DataColumns[Cells[j]["field"]] = Cells[j];
                    }
                }
            }
        }

        Content.push("</tr>");
    }

    //生成数据记录
    var Records = Result.rows;

    for (var i = 0, Rows = Records, len = Rows.length; i < len; i++)
    {
        Content.push("<tr>");
        for (var j = 0, lenj = Fields.length; j < lenj; j++)
        {
            if (V.Column[Fields[j]] && V.Column[Fields[j]].formatter)
            {
                Content.push("<td style=\"border:solid 0.5pt #000000;\" >&nbsp;");
                Content.push(V.Column[Fields[j]].formatter(Rows[i][Fields[j]], Rows[i], i));
            }
            else
            {
                if (V.Column[Fields[j]] == "Number" || (DataColumns[Fields[j]] && DataColumns[Fields[j]]["datatype"] && DataColumns[Fields[j]]["datatype"] == "number"))
                {
                    Content.push("<td style=\"border:solid 0.5pt #000000;\" x:num>");
                }
                else
                {
                    Content.push("<td style=\"border:solid 0.5pt #000000;\" >&nbsp;");
                }
                Content.push(Rows[i][Fields[j]]);
            }
            Content.push("</td>");
        }
        Content.push("</tr>");
    }

    //add by fox 2015-10-27
    if (jQuery.isFunction(Footer))
    {
        Content.push(Footer(Fields));
    }
    else
    {
        if (Fields.length > 1)
        {
            var cs0 = Math.floor(Fields.length / 2);
            var cs1 = Fields.length - cs0;
            Content.push("<tr><td style=\"border:solid 0.5pt #000000;\" colspan='")
            Content.push(cs0);
            Content.push("' >值班人:");
            Content.push("</td><td style='border:solid 0.5pt #000000;text-align: right;' colspan='")
            Content.push(cs1);
            Content.push("' >制表日期:");
            Content.push(new Date().FormatString("yyyy-MM-dd"));
            if (Footer && Footer.length > 0)
            {
                Content.push("  数据日期:");
                Content.push(Footer);
            }
            Content.push("</td></tr>");
        }
        else
        {
            Content.push("<tr><td style=\"border:solid 0.5pt #000000;\">值班人:");
            Content.push(" 制表日期:");
            Content.push(new Date().FormatString("yyyy-MM-dd"));
            if (Footer && Footer.length > 0)
            {
                Content.push("  数据日期:");
                Content.push(Footer);
            }
            Content.push("</td></tr>");
        }
    }

    Content.push("</table>");

    var ConHtml = Content.join("");
    var strXlsName = FileName + ".xls";
    var tempForm = $('<form action="/export" method="post"></form>');
    var exportContent = $('<input type="hidden" id="exportContent" name="exportContent" />');
    var fileName = $('<input type="hidden" id="FileName" name="FileName" />');
    exportContent.val(ConHtml);
    tempForm.append(exportContent);
    fileName.val(strXlsName);
    tempForm.append(fileName);
    document.body.appendChild(tempForm[0]);
    tempForm.submit();
    document.body.removeChild(tempForm[0]);
};

var ReportExporter = {
    Register: function (crud, chart, fileName)
    {
        function _export($chart, grid, file)
        {
            if ($chart.length == 0 || $chart.is(":hidden"))
            {
                grid.Export();
            }
            else
            {
                var type = "image/png";

                if (window.Highcharts.exporting && window.Highcharts.exporting.supports(type))
                {
                    var opt = { type: type };
                    if (file)
                    {
                        opt.filename = typeof (file) == "function" ? file() : file.toString();
                    }
                    $chart.highcharts().exportChartLocal(opt);
                    if (type == "image/png" || type == "image/jpeg")
                    {
                        $chart.highcharts().getImageBase64({ type: type });
                    }
                }
                else
                {
                    var width = $($chart.highcharts().renderTo).width();
                    var height = $($chart.highcharts().renderTo).height();
                    var scale = width / height;
                    var config = {
                        scale: scale,
                        width: width,
                        type: type,
                        //url:"http://export.hcharts.cn/"
                        url: "http://export.dlmeasure.com/export/index"
                        //url:"http://export.highcharts.com/"
                    };
                    if (file)
                    {
                        config.filename = encodeURIComponent(typeof (file) == "function" ? file() : file.toString());
                    }
                    //图表导出
                    $chart.highcharts().exportChart(config,
	            	{
	            	    chart: {
	            	        backgroundColor: "#ffffff",
	            	        plotBackgroundColor: null,
	            	        width: width,
	            	        height: height
	            	    }
	            	});
                }
            }
        }

        //导出按钮修改
        crud.View.Container.find("button[command='export']").attr("title", "导出").off("click").on("click", function ()
        {
            _export($(chart), crud.View.Grid, fileName);
        });
    }
};

var PrintReport = function (V, Result, ExportName, Footer)
{

    var FileName = (V.Object.ExportName || ExportName) + new Date().FormatString("yyyy-MM-dd");
    var Content = ["<table style='font-family: 宋体;font-size:16px;'>"];
    var Fields = V.Grid.Element.datagrid("getColumnFields", true);
    var Opts = V.Grid.Element.datagrid("options");
    for (var i = 0, All = V.Column, Arr = V.Grid.Element.datagrid("getColumnFields", false), len = Arr.length; i < len; i++)
    {
        Fields.push(Arr[i]);
    }

    var Field = {};
    for (var i = 0, Arr = (V.Object.Properties || V.Object.Propertys), len = Arr.length; i < len; i++)
    {
        Field[Arr[i].Field] = Arr[i].DataType;
    }

    Content.push("<tr>");
    Content.push("<td style=\"border:solid 1px #000000;text-align:center;height:30px;\" rowspan=\"");
    Content.push(1);
    Content.push("\" colspan=\"");
    Content.push(Fields.length);
    Content.push("\" >&nbsp;");
    Content.push(V.Object.ExportName || ExportName);
    Content.push("</td>");
    Content.push("</tr>");

    var DataColumns = {};
    for (var i = 0, FR = Opts.frozenColumns, R = Opts.columns, len = FR.length > R.length ? FR.length : R.length; i < len; i++)
    {
        Content.push("<tr>");
        //锁定列
        if (i < FR.length)
        {
            for (var j = 0, Cells = FR[i], lenj = Cells.length; j < lenj; j++)
            {
                if (!Cells[j].hidden)
                {
                    Content.push("<td style=\"border:solid 1px #000000;\" rowspan=\"");
                    Content.push(Cells[j].rowspan);
                    Content.push("\" colspan=\"");
                    Content.push(Cells[j].colspan);
                    Content.push("\" >&nbsp;");
                    Content.push(Cells[j].title);
                    Content.push("</td>");

                    if (Cells[j]["datatype"] && Cells[j]["datatype"] == "number")
                    {
                        DataColumns[Cells[j]["field"]] = Cells[j];
                    }
                }
            }
        }
        //非锁定列
        if (i < R.length)
        {
            for (var j = 0, Cells = R[i], lenj = Cells.length; j < lenj; j++)
            {
                if (!Cells[j].hidden)
                {
                    Content.push("<td style=\"border:solid 1px #000000;\" rowspan=\"");
                    Content.push(Cells[j].rowspan);
                    Content.push("\" colspan=\"");
                    Content.push(Cells[j].colspan);
                    Content.push("\" >&nbsp;");
                    Content.push(Cells[j].title);
                    Content.push("</td>");

                    if (Cells[j]["datatype"] && Cells[j]["datatype"] == "number")
                    {
                        DataColumns[Cells[j]["field"]] = Cells[j];
                    }
                }
            }
        }

        Content.push("</tr>");
    }

    //生成数据记录
    var Records = (Result && jQuery.isArray(Result.rows)) ? Result.rows : [];

    for (var i = 0, Rows = Records, len = Rows.length; i < len; i++)
    {
        Content.push("<tr>");
        for (var j = 0, lenj = Fields.length; j < lenj; j++)
        {
            if (V.Column[Fields[j]] && V.Column[Fields[j]].formatter)
            {
                Content.push("<td style=\"border:solid 1px #000000;\" >&nbsp;");
                Content.push(V.Column[Fields[j]].formatter(Rows[i][Fields[j]], Rows[i], i));
            }
            else
            {
                if (V.Column[Fields[j]] == "Number" || (DataColumns[Fields[j]] && DataColumns[Fields[j]]["datatype"] && DataColumns[Fields[j]]["datatype"] == "number"))
                {
                    Content.push("<td style=\"border:solid 1px #000000;\" x:num>");
                }
                else
                {
                    Content.push("<td style=\"border:solid 1px #000000;\" >&nbsp;");
                }
                Content.push(Rows[i][Fields[j]]);
            }
            Content.push("</td>");
        }
        Content.push("</tr>");
    }

    //add by fox 2015-10-27
    if (jQuery.isFunction(Footer))
    {
        Content.push(Footer(Fields));
    }
    else
    {
        if (Fields.length > 1)
        {
            var cs0 = Math.floor(Fields.length / 2);
            var cs1 = Fields.length - cs0;
            Content.push("<tr><td style=\"border:solid 1px #000000;\" colspan='");
            Content.push(cs0);
            Content.push("' >值班人:");
            Content.push("</td><td style='border:solid 1px #000000;text-align: right;' colspan='");
            Content.push(cs1);
            Content.push("' >制表日期:");
            Content.push(new Date().FormatString("yyyy-MM-dd"));
            if (Footer && Footer.length > 0)
            {
                Content.push("  数据日期:");
                Content.push(Footer);
            }
            Content.push("</td></tr>");
        }
        else
        {
            Content.push("<tr><td style=\"border:solid 1px #000000;\">值班人:");
            Content.push(" 制表日期:");
            Content.push(new Date().FormatString("yyyy-MM-dd"));
            if (Footer && Footer.length > 0)
            {
                Content.push("  数据日期:");
                Content.push(Footer);
            }
            Content.push("</td></tr>");
        }
    }

    Content.push("</table>");

    jQuery/*.Printer()*/.Print({ Title: FileName, Body: Content.join(""), Style: "table{border-collapse: collapse;}" });
};

function GetRowValue(row, field)
{
    try
    {
        return eval("row['" + field.replace(/\./g, "']['") + "']");
    } catch (e) { return ""; }
}

function GetBindName(Val, Code, Bindings)
{
    var name = Val;
    var Row = GetBindRow(Val, Code, Bindings)
    if (Row)
    {
        name = Row['name'];
    }
    return name;
}

function GetBindRow(Val, Code, Bindings)
{
    var name = Val;
    var Records = GetBindRecords(Code, Bindings);
    var Row = null;
    for (var j = 0; j < Records.length; j++)
    {
        var R = Records[j];
        if (R['value'] == Val)
        {
            Row = $.extend(true, {}, R);
        }
    }
    return Row;
}

function GetBindRecords(Code, Bindings)
{
    Bindings = Bindings || GBindings || [];
    var Records = [];
    for (var i = 0; i < Bindings.length; i++)
    {
        if (Bindings[i].Code == Code)
        {
            Records = Bindings[i].Records;
        }
    }
    return Records;
}

//CRUD下拉框联动
function LinkAge(el1, el2, code2, pnm, mustin)
{
    if (!pnm) pnm = 'pid'
    el1.combobox({
        onChange: function (n, o)
        {
            var objs = GetBindRecords(code2);
            var nobjs = [];
            if (!mustin) nobjs.push({ '_id': '', 'name': '未设置', 'value': '', pnm: '' });
            for (var i = 0; i <= objs.length; i++)
            {
                var c = objs[i];
                if (c && c[pnm])
                {
                    if (c[pnm] == n)
                    {
                        nobjs.push(c);
                    }
                }
            }
            el2.combobox({ data: nobjs });
            if (nobjs.length > 0 && mustin)
            {
                el2.combobox('setValue', nobjs[0]['value']);
            } else
            {
                el2.combobox('setValue', '');
            }
        }
    });
}

//datagrid 上下单元格合并
function MergeCell(grid,data,fields){
         setTimeout(function(){
                var rows = data.rows;
                var startIndex = 0;
                var endIndex = 0;
                if (rows.length < 1) {
                    return;
                }
                $.each(fields,function(j,ColName){
                    $.each(rows, function (i, row) {
                        if (GetRowValue(row,ColName) == GetRowValue(rows[startIndex],ColName)) {
                            endIndex = i;
                        }
                        else {
                            grid.datagrid('mergeCells', {
                                index: startIndex,
                                field: ColName,
                                rowspan: endIndex - startIndex + 1
                            });
                            startIndex = i;
                            endIndex = i;
                        }
                    });
                    grid.datagrid('mergeCells', {
                        index: startIndex,
                        field: ColName,
                        rowspan: endIndex - startIndex + 1
                    });
                });
            },100);
}

function DataImport(Container, Options)
{
    var Loading = jQuery.Loading({ Message: "数据加载中……", Timeout: 30 });
    var Mapping = {};
    if (Options.Mapping)
    {
        //查询Mapping
        jQuery.Loader("/ubiz/mapping/query.json",
        {
            conditions:
            [
                { Field: "cid", Operate: "=", Value: Options.Mapping.Params.Cid, Relation: "and" },
                { Field: "code", Operate: "=", Value: Options.Mapping.Params.Code, Relation: "and" }
            ], index: 1, order: [], size: 99
        },
        function (Result)
        {
            if (Result.total > 0)
            {
                Mapping = Result.rows[0];
                if (jQuery.isFunction(Options.Mapping.Callback))
                {
                    Options.Mapping.Callback(Mapping);
                }
            }
        });
        /*
        jQuery("<button type=\"button\">映射管理</button>").appendTo(Container).click(function(Evt)
        {
        top.ShowDialog({ Title: "映射管理", Url: "/ubiz/dlgMapping.html", Width: 640, Height: 480 },
        Options.Mapping.Params,
        function(Result)
        {
        if(Result)
        {
        Mapping = Result;
        if(jQuery.isFunction(Options.Mapping.Callback))
        {
        Options.Mapping.Callback(Mapping);
        }
        }
        });
        });//*/
    }
    /*
    if(Options.Import)
    {
    jQuery("<button type=\"button\">数据导入</button>").appendTo(Container).click(function(Evt)
    {
    if(Mapping.fields && Mapping.fields.length > 0)
    {
    top.ShowDialog({ Title: "数据导入", Url: "/ubiz/dlgImport.html", Width: 800, Height: 600 }, jQuery.extend(true, {}, Options.Import, { Mapping: Mapping }), Options.Import.Callback);
    }
    else
    {
    ShowDialog({ Title: "提示", Message: "请先打开映射管理，建立映射规则", Type: MyDialog.Types.Message, Icon: MyDialog.Icons.Info });
    }
    });

    }//*/

    var AutoComplete = function (Input, Callback)
    {
        var Val = jQuery(Input).val();
        if (Val)
        {
            Loading.Show();
            var Fields = {};
            for (var i = 0, Arr = Mapping.fields || [], len = Arr.length; i < len; i++)
            {
                Fields[Arr[i].source] = 1;
            }
            var Pars =
		    {
		        coll_id: Mapping.source.table,
		        fields: Fields,
		        conditions: [{ Field: Mapping.fields[0].source, Value: Val, Operate: "=", Group: 1, Relation: "and"}]
		    };
            jQuery.Loader("/hd/analysis/mapping/data.json", Pars, function (Result)
            {
                if (Result.rows.length == 1)
                {
                    R = {};
                    for (var j = 0, Rs = Result.rows[0], Mp = Mapping.fields, lenj = Mp.length; j < lenj; j++)
                    {
                        R[Mp[j].target] = Rs[Mp[j].source];
                    }
                    Callback(R);
                }
                Loading.Hide();
            }, function (Msg)
            {
                Loading.Hide();
            });
        }
    };
    return AutoComplete;
};

function GetVal(val, unit, dp)
{
    if (val && typeof val == "object" && "Value" in val)
    {
        return GetVal(val.Value, val.Unit, val.Dp);
    }
    else
    {
        if (val == "-")
        {
            return "-";
        }
        else if (!val && val != 0)
        {
            return "";
        }
        else if (unit && unit.toString().indexOf(":") > 0)
        {
            var c = unit.split("#");
            for (var i = 0; i < c.length; i++)
            {
                if (c[i].indexOf("*" + val.toString() + ":") >= 0)
                {
                    return c[i].split(":")[1];
                }
            }
            return "";
        }
        else
        {
            return val.toFixed(dp);
        }
    }
};

//浏览器判断
(function ()
{

    var matched, browser;

    // Use of jQuery.browser is frowned upon.
    // More details: http://api.jquery.com/jQuery.browser
    // jQuery.uaMatch maintained for back-compat
    jQuery.uaMatch = function (ua)
    {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
        [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};

    if (matched.browser)
    {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome)
    {
        browser.webkit = true;
    } else if (browser.webkit)
    {
        browser.safari = true;
    }

    //增加IE浏览器判断
    ua = navigator.userAgent.toLowerCase();
    if (ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/))
    {
        browser.msie = true
    }

    jQuery.browser = browser;
})();

/*浏览器环境详细判断*/

(function ($)
{
    var ua = navigator.userAgent.toLowerCase(),
			 doc = document.documentElement,

			 ie = 'ActiveXObject' in window,

			 webkit = ua.indexOf('webkit') !== -1,
			 phantomjs = ua.indexOf('phantom') !== -1,
			 android23 = ua.search('android [23]') !== -1,
			 chrome = ua.indexOf('chrome') !== -1,
			 gecko = ua.indexOf('gecko') !== -1 && !webkit && !window.opera && !ie,

			 mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1,
			 msPointer = !window.PointerEvent && window.MSPointerEvent,
			 pointer = (window.PointerEvent && navigator.pointerEnabled) || msPointer,

			 ie3d = ie && ('transition' in doc.style),
			 webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
			 gecko3d = 'MozPerspective' in doc.style,
			 opera12 = 'OTransition' in doc.style;

    var touch = !window.L_NO_TOUCH && !phantomjs && (pointer || 'ontouchstart' in window ||
			(window.DocumentTouch && document instanceof window.DocumentTouch));

    var detail = {
        ie: ie,
        ielt9: ie && !document.addEventListener,
        webkit: webkit,
        gecko: gecko,
        android: ua.indexOf('android') !== -1,
        android23: android23,
        chrome: chrome,
        safari: !chrome && ua.indexOf('safari') !== -1,

        ie3d: ie3d,
        webkit3d: webkit3d,
        gecko3d: gecko3d,
        opera12: opera12,
        any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs,

        mobile: mobile,
        mobileWebkit: mobile && webkit,
        mobileWebkit3d: mobile && webkit3d,
        mobileOpera: mobile && window.opera,
        mobileGecko: mobile && gecko,

        touch: !!touch,
        msPointer: !!msPointer,
        pointer: !!pointer,

        retina: (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1
    };

    if ($)
    {
        $.Browser = detail;
    }
})(jQuery);


var Resize = function () {
    $(".main").parent().width($(".header").width());
    var h = $(window).height() - $(".header").height() - 12;
    var w = $(".header").width()-$(".slider").width();
    $('#url_iframe').css("height", h).css("width",w).attr('src', $("#url_iframe").attr('src'));
    var w = $("#searchtext").width();
    $("#station-div-auto").width(w);
    $("#station-div-auto>div").width(w);
}


//纵转横 k 数据 ,需转换的列[]
function dataToY(k,ynm,hnm ,fmt){

    if (!hnm){
        hnm="m";
    }
	if (!fmt){
		fmt=0
	}

    var dd = [];
    $.each(k,function(i,x){
        dd.push(x[hnm]);
    })
    dd.sort(function (x, y) {
        return x-y;
    });
    var datax = [];
    var datay={}
    $.each(ynm,function(i,x){
    	 datay[ynm[i] ]=[]
    })
    $.each(dd,function(i,x){
        $.each(k,function(j,y){
            if (x == y[hnm]) {
            	if(fmt==1){

            		datax.push((new Date(y[hnm] * 1000).getFullYear()+"").substring(2,4) + "-" + (new Date(y[hnm] * 1000).getMonth() + 1 < 10 ? "0" + (new Date(y[hnm] * 1000).getMonth() + 1) : new Date(y[hnm] * 1000).getMonth() + 1));
            	}else{
                    datax.push(new Date(y[hnm] * 1000).getFullYear() + "-" + (new Date(y[hnm] * 1000).getMonth() + 1 < 10 ? "0" + (new Date(y[hnm] * 1000).getMonth() + 1) : new Date(y[hnm] * 1000).getMonth() + 1));

            	}

                $.each(datay,function(z,s){
                    datay[z].push(y[z]);
                })
            }
        })
    });
    return [datax,datay];
}


function Gbind(v,c,f,kf){
    kf=kf||"value";
    for(var i = 0, records = window.DicBindings[c] || []; i < records.length; i++){
        var item = records[i];
        if(item[kf] == v){
            return f ? (item[f] || item.name) : item.name;
        }
    }
    return "";
}

