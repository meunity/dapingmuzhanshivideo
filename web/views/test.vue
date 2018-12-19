<template>
    <div class="views-test">
        <button @click="changeInfo"></button>
    </div>

</template>

<script>
export default {
    props: {},
    data() {
        return {}
    },
    created() {},
    mounted() {
       
    },
    computed: {},
    methods: {
        changeInfo:function(){
            debugger
         var oo = {
            Divisions: [['5b8f685ee138232af7db04d8']],
            Token: '5bc7f401e138234b9d804891',
            Stations: [],
            DTypes: [ 'GAODU', 'AD', 'YW', 'HHYW', 'SSLL', 'SJLJ', 'BKT', 'COD', 'MNL', 'YULIANG', 'KZYW', 'BJL', 'SKQH', 'PL', 'NYRSF', 'CODSZ', 'M', 'KG', 'BFZT', 'GZXH', 'FXLJ', 'YL', 'ZD', 'YuL', 'PH', 'SCCS', 'MZKG', 'DCDY', 'SD', 'JRLL', 'ZRLL', 'BYLL', 'BNLL', 'BZLL', 'ZRTQ', 'WD', 'KD', 'BJ', 'SL', 'DL', 'DY', 'XJCS', 'KZZT', 'XHZ', 'KZT', 'GZT', 'TX', 'CYY', 'YCCZ', 'ZL', 'SS', 'MJZT', 'CYGDDFKG', 'DBLCY', 'ASCY', 'CFCY', 'XYZDH', 'ZXLJ', 'UPS', 'LS', 'SHIDU', 'DIANLIANG', 'BZT', 'HBLL', 'XSL', 'QTYW', 'SZD', 'JBJZD', 'JBJYX', 'JBJGZ', 'GFJZD', 'GFJYX', 'GFJGZ' ],
            Favorited: false,
            From: 0,
            Size: 99999,
            Sort: -1,
            AType: null,
            Alarm: false
        }
        var url = '/sxps/hd/station/list.json'
        
            $.ajax({
                type: 'POST',
                data: JSON.stringify(oo),
                url: url,
                dataType: 'json'
            })
            .success(function(json) {
                if (json.Code == 0) {
                } else {
                    Msg(json.Message)
                }
            })
        },
    },
    watch: {},
    components: {}
}
</script>
<style lang="less" >
.views-test {
}
</style>