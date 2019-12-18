<template>
  <v-container>
    <client-only>
      <div id="map" />
    </client-only>
    <v-btn>
      Click here
    </v-btn>
    <br>
    <input type="range" name="Snödjup" min="0" max="100">
    <br>
    <v-btn type="submit">
      Spara
    </v-btn>
    <div id="map-wrap" style="height: 100vh">
      <client-only>
        <l-map :zoom="13" :center="[47.413220, -1.219482]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="[47.413220, -1.219482]"></l-marker>
        </l-map>
      </client-only>
    </div>
  </v-container>
</template>

<script>

export default {

  mounted () {
    console.log(this.$L)
    /* const mymap = this.$L.map('map').setView([[51.505, -0.09], 20])

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1Ijoic2hlc3R5ZiIsImEiOiJjazQ4N3F3eTAwNTBxM3JwbzBjMHIxdXgxIn0.scv-CjQF0bozDRX-1cft1A'
    }).addTo(mymap)
    this.map = mymap */
  }
}

/*
const mymap = LMap('mapid').setView([62.3908, 17.3069], 13)
LTileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1Ijoic2hlc3R5ZiIsImEiOiJjazQ4N3F3eTAwNTBxM3JwbzBjMHIxdXgxIn0.scv-CjQF0bozDRX-1cft1A'
}).addTo(mymap)

const opts = { setView: true, watch: true, enableHighAccuracy: true, maximumAge: 1000 }

mymap.locate(opts)

function onLocationFound (e) {
  const radius = e.accuracy

  LMarker(e.latlng).addTo(mymap)
    .bindPopup('You are within ' + radius + ' meters from this point').openPopup()

  LCircle(e.latlng, radius).addTo(mymap)
}

mymap.on('locationfound', onLocationFound)

/* function doLocate () {
  mymap.locate(opts)
} */
</script>

<style>
</style>
<!--
<script
  src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
  integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
  crossorigin=""
/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
crossorigin=""/>
 -->
