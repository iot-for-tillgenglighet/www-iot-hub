<template>
  <v-container class="mx-auto justify-center">
    <div id="newmap" style="height: 80vh;" />
    <v-layout
      justify-center
      align-center
    >
      <v-btn
        class="justify-center white--text"
        x-large
        to="/problemreport/add"
        outlined
        text
        color="blue"
      >
        Ny felrapport
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {

  mounted () {
    const L = this.$L
    let categories = []
    let layers = []

    const newmap = L.map('newmap')
    newmap.setView([62.3908, 17.3096], 12)

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(newmap)

    const promise1 = axios.get(process.env.baseUrl + '/api/graphql?query={getCategories{id,label,reportType}}')
    const promise2 = axios.get(process.env.baseUrl + '/api/graphql?query={getAll{id,pos{lat,lon},type}}')

    Promise.all([promise1, promise2]).then(function (response) {
      categories = response[0].data.data.getCategories
      response = response[1].data.data.getAll

      layers = createLayers(categories, response)
      reportPopups(layers)
    })

    function createLayers (categories, response) {
      const returnArray = []
      for (let i = 0; i < categories.length; i++) {
        const x = {
          layer: L.layerGroup().addTo(newmap),
          category: categories[i],
          reports: []
        }

        for (let n = 0; n < response.length; n++) {
          if (response[n].type === categories[i].reportType) {
            x.reports.push(response[n])
          }
        }
        returnArray.push(x)
      }
      return returnArray
    }

    function reportPopups (layers) {
      const props = { autoClose: false, closeOnClick: false, closeButton: false, closeOnEscapeKey: false, autoPan: false }
      const popupOverlay = {}
      for (let x = 0; x < layers.length; x++) {
        for (let n = 0; n < layers[x].reports.length; n++) {
          L.popup(props)
            .setLatLng({ lat: layers[x].reports[n].pos.lat, lon: layers[x].reports[n].pos.lon })
            .setContent('Rapporterad ' + layers[x].category.label)
            .addTo(layers[x].layer)
        }
        popupOverlay[layers[x].category.label] = layers[x].layer
      }

      L.control.layers(null, popupOverlay).addTo(newmap)
    }
  }
}
</script>
