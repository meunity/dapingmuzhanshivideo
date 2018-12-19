var Prefix = '';

$.po = function (url,data) {
    return $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        url:url,
        contentType:'application/json; charset=utf-8',
        dataType:'json'
    })
}

$.ge = function (url) {
    return $.ajax({
        type:'GET',
        url:url,
        contentType:'application/json; charset=utf-8',
        dataType:'json'
    })
}

function co(func) {
    var self=this;
    return $.Deferred(function(def){
        return func.then(function(rep){
            if(rep.Code == 0){
                return def.resolve(rep.Response);
            }else{
                window.App.$message.error(rep.Message||"调用过程发生错误");
                return def.reject(rep);
            }
        });
    });
}

function cobi(func) {
    var self=this;
    return $.Deferred(function(def){
        return func.then(function(rep){
            if(rep.Data_out){
                return def.resolve(rep.Data_out);
            }else{
                window.App.$message.error(rep.Message||"调用过程发生错误");
                return def.reject(rep);
            }
        });
    });
}
export function CRUD(service,model){
    var qurl=`/${service}/${model}/query.json`;
    return {
        query:(params)=>{return co($.po(qurl,params))},
        insert:(record)=>{return co($.po(`/${service}/${model}/insert.json`,{record:record}))},
        update:(record)=>{return co($.po(`/${service}/${model}/update.json`,{record:record}))},
        delete:(record)=>{return co($.po(`/${service}/${model}/delete.json`,{record:record}))},
        get:(id)=>{return co($.po(`/${service}/${model}/get.json`,{_id:id||{}}))},
        post:(m,params)=>{return co($.po(`/${service}/${model}/${m}.json`,params))},
        url:qurl,
        key:"_id"
    }
};

export const API = {
    Load:(url, param)=>{
        return co($.po(Prefix+url, param));
    },
    getWeatherData:(param)=>{
        return co($.po(Prefix+"/biz/weather/query.json", param));
    },
 
    getStationList:(param)=>{
        let prefix="";
        if (param.prefix){
             prefix=param.prefix
        }
        return co($.po(prefix+"/hd/station/list.json",param));
    },
    getAlarmData:(param)=>{
        let prefix="";
        if (param.prefix){
             prefix=param.prefix
        }
        
        return co($.po(prefix+"/hd/sensor/realtime.json",param));
    },
    getHistoryAlarmData:(param)=>{
        let prefix="";
        if (param.prefix){
             prefix=param.prefix
        }
        
        return co($.po(prefix+"/ubiz/alarmhandle/query.json",param));
    },
    geSensorHistory:(param)=>{
        let prefix="";
        if (param.prefix){
             prefix=param.prefix
        }
        return co($.po(prefix+"/hd/sensor/history.json",param));
    },

    geStationDetail:(param)=>{
        let prefix="";
        if (param.prefix){
             prefix=param.prefix
        }
        return co($.po(prefix+"/hd/station/detail.json",param));
    },

    gePumpGeneral:(param)=>{
        let prefix="sxps";
        return co($.po(prefix+"/webapp/overview/paishui.json",param));
    },



    getWeatherData:(param)=>{
        let prefix="";
        if (param.prefix){
            prefix=param.prefix
       }
        return co($.po(prefix+"/biz/weather/query.json", param));
    },
   
    geForecast:(param)=>{
        let prefix="";
        if (param.prefix){
             prefix=param.prefix
        }
        return cobi($.po(prefix+"/api/Dataforecast/Data_forecast ",param));
    },
    getErrorData: (param)=>{
        return $.po('http://112.64.170.158:8191/Service1.svc/WarningEventsInfo',{});
    },
    getScadaEvent:(param)=>{
        let prefix="";
        if (param.prefix){
             prefix=param.prefix
        }
        return co($.po(prefix+"/scada/event/query.json",param));
    },
    getHotLine:(param) => {
        return co($.po('sxgs/shaoxing/rexian/rexianGdQuery.json', param));
    }
};
