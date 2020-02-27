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
import ReportCategory from '../../components/models/reportCategory.model.js'

export default {

  mounted () {
    const L = this.$L

    const newmap = L.map('newmap')

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(newmap)

    const iceLayer = L.layerGroup().addTo(newmap)
    const roadLayer = L.layerGroup().addTo(newmap)
    const safetyLayer = L.layerGroup().addTo(newmap)

    const categories = [
      new ReportCategory("halka", "type_ice"),
      new ReportCategory("otrygghet", "type_unsafe"),
      new ReportCategory("vägskador", "type_road")
    ]

    const response = [
      {
        pos: {
          lat: 62.3901,
          lon: 17.3062
        },
        type: "type_ice"
      },
      {
        pos: {
          lat: 62.3901,
          lon: 17.3062
        },
        type: "type_unsafe"
      },
      {
        pos: {
          lat: 62.3901,
          lon: 17.3062
        },
        type: "type_road"
      },
      {
        pos: {
          lat: 62.3901,
          lon: 17.3062
        },
        type: "type_unsafe"
      },
      {
        pos: {
          lat: 62.3901,
          lon: 17.3062
        },
        type: "type_road"
      },
      {
        pos: {
          lat: 62.3901,
          lon: 17.3062
        },
        type: "type_ice"
      },
      {
        pos: {
          lat: 62.3901,
          lon: 17.3062
        },
        type: "type_road"
      },
      {
        pos: {
          lat: 62.3901,
          lon: 17.3062
        },
        type: "type_ice"
      }
    ]

    const layers = createLayers(categories, response)

    reportPopups(layers)

    newmap.setView([62.3908, 17.3096], 12)

    fetchData()

    function fetchData () {
      axios({
        method: 'GET',
        url: process.env.baseUrl + '/api/graphql?query={getAll{id,pos{lat,lon},type}}'
      }).then(
        (result) => {
          //placePopups(result)
        }
      )
    }

    function createLayers (categories, response) {
      let returnArray = []
      for (let i = 0; i < categories.length; i++) {
        const x = {
          layer: L.layerGroup().addTo(newmap),
          category: categories[i],
          reports: []
        }
        
        for (let n = 0; n < response.length; n++) {
            if (response[n].type == categories[i].reportType)
              x.reports.push(response[n])

        }
        returnArray.push(x)
      }
      console.log(returnArray)
      return returnArray
    }


    function reportPopups (layers) {
      const props = { autoClose: false, closeOnClick: false, closeButton: false, closeOnEscapeKey: false, autoPan: false }  
      const popupOverlay = {}
      for (let x = 0; x < layers.length; x++) {
        for (let n = 0; n < layers[x].reports.length; n++) {
          L.popup(props)
            .setLatLng({ lat: layers[x].reports[n].pos.lat, lon: layers[x].reports[n].pos.lon })
            .setContent('Rapporterad ' + layers[x].reports[n].type)
            .addTo(layers[x].layer)
        }
        popupOverlay[layers[x].category.label] = layers[x].layer 
      }

     L.control.layers(null, popupOverlay).addTo(newmap)
    }

    let reportTypes = []
    for (let i = 0; i < response.length; i++) {
      if(findDupes(reportTypes,response[i].type))
        continue

      reportTypes.push(response[i].type)
    }

    function findDupes (haystack, needle) {
      for (let i = 0; i < haystack.length; i++) {
        if (needle == haystack[i])
          return true

      }
      return false
    }
  }
}
</script>
