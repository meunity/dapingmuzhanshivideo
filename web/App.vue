<template>
    <div  id="viewer">

        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',
    props: [
        "sss"
    ],
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            "cs": "app_"
        }
    }
}
</script>
<style lang="less">
  #viewer{
    width:100%;
    height: 100%;
  }
</style>
