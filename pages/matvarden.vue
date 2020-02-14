/* eslint-disable */
<template>
  <v-container>
    <div id="newmap" style="height: 80vh;" />
  </v-container>
</template>

<script>
import axios from 'axios'
import Snowdepth from '../components/models/snowdepth.model.js'
import MeasurementPosition from '../components/models/measurementPosition.model.js'

export default {
  mounted () {
    const L = this.$L

    const newmap = L.map('newmap')

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(newmap)

    const popupsLayer = L.layerGroup().addTo(newmap)

    newmap.setView([62.3908, 17.3069], 12)

    fetchData()
    doPoll()

    function fetchData(){
      axios({
        method: 'GET',
        url: process.env.baseUrl + '/api/graphql?query={snowdepths{from{pos{lat,lon}},when,depth,manual}}'
      }).then(
        (result) => {
          placePopups(result)
        }
      )
    }

    function placePopups (result) {
      const results = result.data.data.snowdepths

      popupsLayer.clearLayers()

      for (let i = 0; i < results.length; i++) {
        const latlng = { lat: results[i].from.pos.lat, lon: results[i].from.pos.lon }
        const depths = Math.round(((results[i].depth) + Number.EPSILON) * 100) / 100
        const classLabelName = (results[i].manual === true ? 'manualPopup' : 'sensorPopup')

        L.popup({ autoClose: false, closeOnClick: false, closeButton: false, closeOnEscapeKey: false, className: classLabelName, autoPan: false })
          .setLatLng(latlng)
          .setContent(depths + ' cm')
          .addTo(popupsLayer)
      }
    }

    function doPoll() {
      setTimeout(function () {
          fetchData()
          doPoll()
      }, 300000)
    }
  }
}
</script>
