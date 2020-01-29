<template>
  <v-container>
    <div id="map" class="mx-auto text-center">
      <client-only>
        <l-map :zoom="13" :center="center" style="height: 80vh; width: 80vw;">
          <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="center" />
          <l-circle :lat-lng="center" :radius="radius" />
          <l-marker :lat-lng="[62.398659, 17.341804]" />
          <l-marker :lat-lng="[62.379448, 17.345182]" />
        </l-map>
      </client-only>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      center: [62.3908, 17.3069],
      radius: 0
    }
  },
  mounted () {
    const L = this.$L
    const mymap = L.map('map')

    const component = this

    function onLocationFound (e) {
      component.center = e.latlng
      component.radius = e.accuracy
      console.log('hej')
    }

    mymap.on('locationfound', onLocationFound)

    mymap.locate({ setView: true, watch: true, enableHighAccuracy: true })
  }
}
</script>
