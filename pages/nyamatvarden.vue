<template>
  <v-container
    class="mx-auto text-center"
  >
    <div id="map-wrap" class="mx-auto text-center">
      <client-only>
        <l-map :zoom="13" :center="center">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="center" />
          <l-circle :lat-lng="center" :radius="radius" />
        </l-map>
      </client-only>
    </div>
    <br>
    <v-card-text>
      <v-row>
        <v-col class="pr-4">
          <v-slider
            v-model="slider"
            :max="max"
            :min="min"
            thumb-label="always"
            class="align-center"
            hide-details
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-btn color="blue" text>
      Spara
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      center: [37.14, 115.483],
      radius: 0,
      min: 0,
      max: 100,
      slider: 0,
      range: [0, 100]
    }
  },
  mounted () {
    const L = this.$L
    const mymap = L.map('map-wrap')

    const component = this

    function onLocationFound (e) {
      component.center = e.latlng
      component.radius = e.accuracy
    }
    mymap.on('locationfound', onLocationFound)

    mymap.locate({ setView: true, watch: true, enableHighAccuracy: true })
  }
}
</script>

<style>
div.leaflet-container {
  height: 1000px;
  width: 1000px;
}
</style>
