const Vue = require('vue/dist/vue.min.js');
const Vuex = require('vuex');
Vue.use(Vuex);
import { API } from '../modules/service';
const utils = require('../utils');

const state = {
    Menus: window.Menus,
    Apps: window.Apps,
    SystemName: window.GCtx.customer.sysnm || ("智慧水务信息管理系统"),
    GCtx: window.GCtx,
    User: window.GCtx.user,
    LeftNav: 180,
    History: [],
    CurrentMenu: {},
    ShowChangePwd: false,
    theme: "Light",
    FullScreen: 0
}

const mutations = {
    loadApp(state, app) {
        let loadingInstance1 = window.App.$loading({ fullscreen: true });
        API.loadApp(app).done((Result) => {
            loadingInstance1.close();
            mh.Menus = Result;
            mh.Root = Result;
            mh.All = {};
            mh.History.All = {};
            mh.History.Current = {};
            mh.History.Pages = [];
            state.Menus = Result;
            state.History = [];
            state.CurrentMenu = {};
            utils.CreateAll(mh.All, mh.Root, null);
            let url = utils.getFirstMenu(Result);
            Open(url);
        }).fail((err) => { });
    },
    loadUser(state) {
        API.getUser(state.GCtx.user._id).done((Result) => {
            state.User = Result;
        }).fail((err) => { });
    },
    updateMenu(state, url) {
        state.CurrentMenu = url;
        state.CurrentMenuId = getCurrentMenuId(window.Menus, url);
    },
    updateLeftNav(state, w) {
        state.LeftNav = w;
    },
    addMenu(state, menu) {


        if (mh.History.MaxCount <= mh.History.Pages.length) {
            state.History.shift();
            mh.History.Pages.shift();
        }
        state.History.push($.extend({}, menu));
        state.CurrentMenu = { Id: menu.Id, Item: $.extend({}, menu) };
        mh.History.Pages.push({ Id: menu.Id, Item: $.extend({}, menu) });
        mh.History.Current = { Id: menu.Id, Item: $.extend({}, menu) };

       
    },
    selectMenu(state, menu) {

        state.CurrentMenu = { Id: menu.Id, Item: $.extend({}, menu) };
        mh.History.Current = { Id: menu.Id, Item: $.extend({}, menu) };

       

    },
    removeMenu(state, menuId) {

       
        if (state.History.length > 0) {
            for (var i = 0; i < state.History.length; i++) {
                if (state.History[i].Id == menuId) {
                    state.History.splice(i, 1);
                    break;
                }
            }
            for (var i = 0; i < mh.History.Pages.length; i++) {
                if (mh.History.Pages[i].Id == menuId) {
                    mh.History.Pages.splice(i, 1);
                    break;
                }
            }
            if (state.CurrentMenu.Id == menuId) {
                var lastM = mh.History.Pages[mh.History.Pages.length - 1];
              


                Open(lastM.Item.Val);
           

            }
          
        }
    },
    changePwdStu(state, stu) {
        state.ShowChangePwd = stu;
    },
    setFullScreen(state, fullst) {
        state.FullScreen = fullst;

    }
}

export default new Vuex.Store({
    state,
    mutations
});