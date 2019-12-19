<template>
  <v-container>
    <div id="map-wrap" style="height: 100vh">
      <client-only>
        <l-map>
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
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
  mounted () {
    const L = this.$L
    const mymap = this.$L.map('map-wrap')

    function onLocationFound (e) {
      const radius = e.accuracy
      console.log(e)

      L.marker(e.latlng).addTo(mymap)
        .bindPopup('You are within ' + radius + ' meters from this point').openPopup()

      L.circle(e.latlng, radius).addTo(mymap)
      console.log('locationfound')
    }

    mymap.on('locationfound', onLocationFound)

    mymap.locate({ setView: true, watch: true, enableHighAccuracy: true })
    console.log(mymap)
    console.log(this.$L)
  }
}

</script>

<style>
</style>
