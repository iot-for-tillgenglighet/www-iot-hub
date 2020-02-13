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

    newmap.setView([62.3908, 17.3069], 12)

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

      for (let i = 0; i < results.length; i++) {
        const latlng = { lat: results[i].from.pos.lat, lon: results[i].from.pos.lon }
        const depths = Math.round(((results[i].depth) + Number.EPSILON) * 100) / 100
        const classLabelName = (results[i].manual === true ? 'manualPopup' : 'sensorPopup')

        L.popup({ autoClose: false, closeOnClick: false, closeButton: false, closeOnEscapeKey: false, className: classLabelName, autoPan: false })
          .setLatLng(latlng)
          .setContent(depths + ' cm')
          .openOn(newmap)
      }
    }

    function tryTest() {
        setTimeout(function () {
            testData();
            tryTest();
        }, 1000);
    }

    function testData(){

      console.log('testData')

      let randomnumber = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
      
      let stuff = new Snowdepth(new MeasurementPosition(62.3901, 17.3062), "2020-02-13T10:20:22Z", randomnumber, true);
      let data = {
        data: {
          data: {
            snowdepths: [stuff]
          }
        }
      }
      placePopups(data)
    }
  }
}
</script>
