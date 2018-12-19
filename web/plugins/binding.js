import { API, CRUD } from '../modules/service.js';
var BINDKEY = "CUE-UNISCADA-BINDING";
HD.LocalStorage.Set(BINDKEY, {})


// //加载数据字典
var Bindings = {};

if(LocalBands){
    LocalBands.forEach(element => {
        Bindings[element.Code]=[]
        element.Records.forEach(re => {
            Bindings[element.Code].push({"Name":re.name,"Value":re.value})
        });

  });
}
API.getGbinding().done(function (GBS) {
    $.each(GBS.Response, function (i, item) {
        if (!Bindings[item.Code]) {
            item.Records.map(function(v){
                v["Name"]=v.name;
                v["Value"]=v.value;
            })
            Bindings[item.Code] = item.Records || [];
        }
    });
    HD.LocalStorage.Set(BINDKEY, Bindings);
});
export function BindRecords(key, _bindings) {
    _bindings = _bindings || {};
    if (key in _bindings) return _bindings[key];
    var Bindings = HD.LocalStorage.Get(BINDKEY, {});
    if (key in Bindings) return Bindings[key];
    return SetBind(key,Bindings);
}

export function SetBind(key,_bindings){
    var Bindings = _bindings||HD.LocalStorage.Get(BINDKEY, {});
    var rs = [];
    switch (key) {
        case "EnterpriseList"://采集项
            new CRUD("operationenterprise","baoxing").query1({}, { async: false }).done((data) => {
                $.each(data.Response.rows, function (i, r) {
                    rs.push({ Name: r.name, Value: r.organizationCode});
                });
                if (rs.length > 0) {
                    Bindings[key] = rs;
                    HD.LocalStorage.Set(BINDKEY, Bindings);
                }
            });
            break;
        case "DivisionTown"://采集项


            new CRUD("division","baoxing").query({query:{lv:2}}, { async: false }).done((data) => {
                $.each(data.rows, function (i, r) {
                    rs.push({ Name: r.nm, Value: r._id });
                });
                if (rs.length > 0) {
                    Bindings[key] = rs;
                    HD.LocalStorage.Set(BINDKEY, Bindings);
                }
                return rs;

            });
            break;

        case "Binding"://采集项
            new CRUD("binding","baoxing").query({}, { async: false }).done((GBS) => {
                $.each(GBS, function (i, item) {
                    if (!Bindings[item.Code]) {
                        item.Records.map(function(v){
                            v["Name"]=v.name;
                            v["Value"]=v.value;
                        })
                        Bindings[item.Code] = item.Records || [];
                    }
                });
                HD.LocalStorage.Set(BINDKEY, Bindings);
                  return rs;
            });
            break;    
    }

    if (rs.length > 0) {
        Bindings[key] = rs;
        HD.LocalStorage.Set(BINDKEY, Bindings);
    }
    return rs;
}

export function Bind(V, KEY, field, bindings) {
    var records = BindRecords(KEY, bindings);
    for (let i = 0; i < records.length; i++) {
        let item = records[i];
        if (item.Value == V) {
            return field ? (item[field] || item.Name) : item.Name;
        }
    }
    return "";
}
