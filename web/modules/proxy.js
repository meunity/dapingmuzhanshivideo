import common from './common.js';
export default {

    Post: function (url, params, success, fail, opts) {

        function _alert(msg) {
            try {
                window.Vue.prototype.$message({ message: msg, type: "error", showClose: true });
            }
            catch (e) {
                alert(msg);
            }
        }

        function _err(msg) {
            let flag = true;
            if (typeof fail == "function") {
                flag = fail(msg);
            }
            flag != false && _alert(msg);
        }

        var signature = HD.Cookie.Get("signature") || "";
        if (signature) signature = JSON.parse(signature);
        var _opts = $.extend(
            {},
            {
                type: "POST",
                headers: {
                    'Authorization': signature ? signature.access_token : '',
                },
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(params),
                url: url
            },
            opts,
            {
                success: function (json) {
                    if (json.Code == 0) {
                        typeof success == "function" && success(json.Response);
                    } else {
                        _err(json.Message);
                    }
                },
                error: function (ex) {
                    _err("请求发生异常(异常代码：" + ex.status + ")");
                }
            }
        )
        $.ajax(_opts);
    },

    norm: function(obj) {
        if (!obj) return obj;
        if (typeof obj == Object && obj == {}) return {};
        return JSON.parse(JSON.stringify(obj));
    },
};