<template>
  <v-container>
    <div id="newmap" style="height: 80vh;" />
    <v-container>
      <v-btn
        outlined
        color="blue"
        text
      >
        GetReports
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
// import axios from 'axios'
import Report from '../components/models/report.model.js'
import axios from 'axios'

export default {
  mounted () {
    const L = this.$L

    const newmap = L.map('newmap')

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(newmap)

    newmap.setView([62.3908, 17.3096], 11)

    axios({
    method: 'GET',
    url: process.env.baseUrl + '/api/graphql?query={getAll{id,pos{lat,lon},type}}'
    }).then(
      (result) => {
        console.log(result)
        const results = result.data.data.getAll
        for (let i = 0; i < results.length; i++) {
          const latlng = { lat: results[i].pos.lat, lon: results[i].pos.lon }
          const marker = L.marker(latlng).addTo(newmap)
          const types = results[i].type
          const popup = L.popup().setContent('Rapporterad ' + types)
          marker.bindPopup(popup)
        }
      }
    )
  },
  methods: {
/*     getAll () {
      axios({
        method: 'GET',
        url: process.env.baseUrl + '/api/graphql?query={getAll{id,pos{lat,lon},type}}'
        }).then(
          (result) => {
          const results = result.data.data.getAll
          for (let i = 0; i < results.length; i++) {
            const latlng = { lat: results[i].pos.lat, lon: results[i].pos.lon }
            const marker = L.marker(latlng).addTo(newmap)
            const depths = Math.round(((results[i].depth) + Number.EPSILON) * 100) / 100
            const types = results[i].reportType
            const popup = L.popup().setContent('Rapporterad ' + types)
            marker.bindPopup(popup)
          }
        }
      )
    } */
/*  getCategories () {
      
    }
    
    */
  }
}
</script>