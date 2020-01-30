<template>
  <v-container>
    <div id="newmap" style="height: 80vh;" />
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  mounted () {
    const L = this.$L
    const component = this

    const newmap = L.map('newmap')

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18
    }).addTo(newmap)

    newmap.on('locationfound', onLocationFound)

    newmap.locate({ setView: true, watch: true, enableHighAccuracy: true })

    function onLocationFound (e) {
      component.center = e.latlng
      component.radius = e.accuracy
    }
    axios({
      method: 'GET',
      url: 'http://localhost:8282/api/graphql?query={snowdepths{from{pos{lat,lon}}when,depth}}'
    }).then(
      (result) => {
        const results = [result.data.data.snowdepths]

        for (let i = 0; i < results.length; i++) {
          console.log(results[i])
        }
      }
    )
  }
}

</script>
