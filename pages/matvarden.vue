/* eslint-disable */
<template>
  <v-container>
    <div id="newmap" style="height: 80vh;" />
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  mounted () {
    console.log(process.env.baseUrl)

    const L = this.$L

    const newmap = L.map('newmap')

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(newmap)

    newmap.setView([62.3908, 17.3096], 11)

    axios({
      method: 'GET',
      url: process.env.baseUrl + '/api/graphql?query={snowdepths{from{pos{lat,lon}}when,depth}}'
    }).then(
      (result) => {
        const results = result.data.data.snowdepths
        for (let i = 0; i < results.length; i++) {
          const latlng = { lat: results[i].from.pos.lat, lon: results[i].from.pos.lon }
          const marker = L.marker(latlng).addTo(newmap)
          const depths = Math.round(((results[i].depth) + Number.EPSILON) * 100) / 100
          const popup = L.popup().setContent('Rapporterat snödjup ' + depths + ' cm')
          marker.bindPopup(popup)
        }
      }
    )
  }
}
</script>
