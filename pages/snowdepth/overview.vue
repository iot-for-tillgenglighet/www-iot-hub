/* eslint-disable */
<template>
  <v-container>
    <div id="newmap" style="height: 80vh;" />
    <v-layout
      justify-center
      align-center
    >
      <v-btn
        class="justify-center white--text"
        x-large
        to="/snowdepth/add"
        outlined
        text
        color="blue"
      >
        Ny snödjupsmätning
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

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

    function fetchData () {
      axios({
        method: 'POST',
        url: process.env.baseUrl + '/api/graphql',
        data: {
          query: `
            query {
              snowdepths {
                from {
                  pos {
                    lat
                    lon
                  }
                }
                when
                depth
                manual
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

    function doPoll () {
      setTimeout(function () {
        fetchData()
        doPoll()
      }, 300000)
    }
  }
}
</script>
