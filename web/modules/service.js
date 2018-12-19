var Prefix = '';

$.po = function (url,data, opts) {
   let _opts= {
        type:'POST',
        data:JSON.stringify(data),
        url:url,
        contentType:'application/json; charset=utf-8',
        dataType:'json'
    }

    return $.ajax($.extend({}, _opts, opts || {}));
}

function co(func) {
    var self = this;
    return $.Deferred(function (def) {
        return func.done(function (rep) {
            if (rep.Code == 0) {
                return def.resolve(rep.Response);
            }else {
                // window.App.$message.error(rep.Message);
                return def.reject(rep.Response);
            }
        }).fail(function (rep) {
            return def.reject(rep);
        });
    });
}

export function CRUD(model,_prefix){
    var pre=_prefix||Prefix;
    var qurl=`/${pre}/${model}/query.json`;
    var key="_id";
    return {
        query1:(params, opts)=>{
            return  $.po(qurl,params||{},opts||{})},
        query:(params, opts)=>{

            return   co($.po(qurl,params||{},opts||{}))},
        insert:(record)=>{return co($.po(`/${pre}/${model}/insert.json`,{record:record}))},
        update:(record)=>{return co($.po(`/${pre}/${model}/update.json`,{record:record}))},
        save:(record)=>{
            if(record[key]){
                return co($.po(`/${pre}/${model}/update.json`,{record:record}));
            }else{
                return co($.po(`/${pre}/${model}/insert.json`,{record:record}));
            }
        },
        delete:(record)=>{return co($.po(`/${pre}/${model}/delete.json`,{record:record}))},
        get:(id)=>{return co($.po(`/${pre}/${model}/get.json`,id))},
        url:qurl,
        post:(m,record)=>{return co($.po(`/${pre}/${model}/${m}.json`,record))},
        key:key
    }
}

export const API = {
    getGbinding:()=>{
        return $.po(`${Prefix}/baoxing/binding/query.json`, {},{async:false});
    },
    getUser:(uid)=>{
        return co($.po(`${Prefix}/ubiz/user/get.json`, {"_id":uid}))
    },
    loadApp:(appsn)=>{
        return co($.po(`${Prefix}/webapp/menu.json`, {"app":appsn}))
    },
    changePwd:(record)=>{
        return co($.po(`${Prefix}/ubiz/user/changepwd/update.json`, {"record":record}))
    },
    getSupervisor: (params) => {
        return co($.po(`${Prefix}/baoxing/division/tree.json`, params))
    },
    getMaxCode: (params) => {
        return co($.po(`${Prefix}/baoxing/getMaxCode.json`, params))
    },
    getEquipmentByStation: (params)=> {
        return co($.po(`${Prefix}/baoxing/equipment/query.json`, params))
    }
}

export const Favs = CRUD('favs','ubiz');

