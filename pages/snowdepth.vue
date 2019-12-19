<template>
  <v-container>
    <div id="map-wrap" style="height: 100vh">
      <client-only>
        <l-map :zoom="13" :center="center">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="center" />
          <l-circle :lat-lng="center" :radius="radius" />
        </l-map>
      </client-only>
    </div>
    <v-btn>
      Click here
    </v-btn>
    <br>
    <input type="range" name="Snödjup" min="0" max="100">
    <br>
    <v-btn type="submit">
      Spara
    </v-btn>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      center: [51.505, -0.09],
      radius: 0
    }
  },
  mounted () {
    const L = this.$L
    const mymap = L.map('map-wrap')

    const component = this

    function onLocationFound (e) {
      // const radius = e.accuracy
      console.log(e)
      component.center = e.latlng
      component.radius = e.accuracy
      // L.marker(e.latlng).addTo(mymap)
      //   .bindPopup('You are within ' + radius + ' meters from this point').openPopup()

      // L.circle(e.latlng, radius).addTo(mymap)
      console.log(component)
      console.log('locationfound')
    }
    mymap.on('locationfound', onLocationFound)

    mymap.locate({ setView: true, watch: true, enableHighAccuracy: true })
    // console.log(mymap)
    // console.log(L)
  }
}

</script>

<style>

</style>
