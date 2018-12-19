<template>
    <div class="my-map">
        <l-map
        :zoom="zoom"
        :center="center"
        style="height: 100%">
        <l-tile-layer
            :url="url"/>
        </l-map>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup, LLayerGroup } from 'vue2-leaflet'
export default {
    components: { LMap, LTileLayer},
    data() {
         return {
            zoom: 13,
            center: L.latLng(30.007351, 120.605599),
            url: 'http://121.40.242.176:8098/Service1.svc/Rest/GMService/{x}/{y}/{z}/1/amap',
            // currentZoom: 13,
            // currentCenter: L.latLng(47.413220, -1.219482),
            // showParagraph: false
        };
    }
}
</script>
<style lang="less" scoped>
.my-map{
    height: 100%;
}
</style>
