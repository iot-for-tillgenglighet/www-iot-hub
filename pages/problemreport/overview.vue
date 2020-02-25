<template>
  <v-container class="mx-auto justify-center">
    <div id="newmap" style="height: 80vh;" />
    <v-layout
      justify-center
      align-center
    >
      <v-checkbox
        v-model="checkbox"
        :label="`Visa halka`"
      >
      </v-checkbox>
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
  data () {
    return {
      checkbox: true
    }
  },
  mounted () {
    const L = this.$L

    const newmap = L.map('newmap')

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(newmap)

    const popupsLayer = L.layerGroup().addTo(newmap)

    newmap.setView([62.3908, 17.3096], 11)

    fetchData()

    function fetchData () {
      axios({
        method: 'GET',
        url: process.env.baseUrl + '/api/graphql?query={getAll{id,pos{lat,lon},type}}'
      }).then(
        (result) => {
          placePopups(result)
        }
      )
    }

    function placePopups (result) {
      const results = result.data.data.getAll
      
      popupsLayer.clearLayers()

      for (let i = 0; i < results.length; i++) {
        const latlng = { lat: results[i].pos.lat, lon: results[i].pos.lon }
        const types = results[i].type
        let classLabelName = results[i].type
        if (results[i].type = "type_ice")
          classLabelName = "type_ice"

        if (results[i].type = "type_unsafe")
          classLabelName = "type_unsafe"

        L.popup({ autoClose: false, closeOnClick: false, closeButton: false, closeOnEscapeKey: false, className: classLabelName, autoPan: false })
          .setLatLng(latlng)
          .setContent('Rapporterad ' + types)
          .addTo(popupsLayer)
      }
    }
  },
  methods: {
    hideIce () {

    }
  }
}
</script>