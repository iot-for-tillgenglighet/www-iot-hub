<template>
  <v-container class="mx-auto justify-center">
    <div id="newmap" style="height: 80vh;" />
  </v-container>
</template>

<script>
import axios from 'axios'
// import Temperature from '../components/models/temperature.model'
// import MeasurementPosition from '../components/models/measurementPosition.model'

export default {

  mounted () {
    const L = this.$L
    const newmap = L.map('newmap')
    newmap.setView([62.3908, 17.3096], 12)

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(newmap)

    const popupsLayer = L.layerGroup().addTo(newmap)

    fetchTemps()

    function fetchTemps () {
      axios({
        method: 'POST',
        url: process.env.baseUrl + '/api/graphql',
        data: {
          query: `
            query {
              temperatures {
                from {
                  pos {
                    lat
                    lon
                  }
                }
                temp
              }
            }    
          `
        },
        headers: { 'content-type': 'application/json' }
      }).then(
        (result) => {
          placePopups(result)
        }
      )
    }

    function placePopups (result) {
      const results = result.data.data.temperatures

      popupsLayer.clearLayers()

      for (let i = 0; i < results.length; i++) {
        const latlng = { lat: results[i].from.pos.lat, lon: results[i].from.pos.lon }
        const temps = Math.round(((results[i].temp) + Number.EPSILON) * 100) / 100
        L.popup({ autoClose: false, closeOnClick: false, closeButton: false, closeOnEscapeKey: false, autoPan: false })
          .setLatLng(latlng)
          .setContent(temps + ' °C')
          .addTo(popupsLayer)
      }
    }
  }
}
</script>
