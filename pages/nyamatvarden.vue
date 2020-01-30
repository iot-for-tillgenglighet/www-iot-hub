<template>
  <v-container>
    <div id="map" class="mx-auto text-center" style="height: 50vh;" />
    <v-card-text class="mx-auto align-center">
      <v-row>
        <v-subheader>Snödjup i centimeter</v-subheader>
      </v-row>
      <v-row>
        <v-slider
          v-model="slider"
          :max="max"
          :min="min"
          type="range"
          thumb-label="always"
          class="align-center"
          hide-details
        />
        <v-btn
          @click="sendData"
          color="blue"
          text
          outlined
        >
          Spara
        </v-btn>
      </v-row>
      <v-row>
        <v-alert
          v-model="successAlert"
          dense
          outlined
          type="success"
          dismissible
        >
          Nytt mätvärde sparat.
        </v-alert>
        <v-alert
          v-model="errorAlert"
          dense
          outlined
          type="error"
          dismissible
        >
          Kunde inte spara nytt mätvärde.
        </v-alert>
      </v-row>
      <br>
    </v-card-text>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      min: 0,
      max: 200,
      slider: '',
      range: [0, 200],
      posLat: 0,
      posLon: 0,
      successAlert: false,
      errorAlert: false
    }
  },
  mounted () {
    const L = this.$L
    const component = this
    const newmap = L.map('map').setView([62.3908, 17.3069], 13)

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(newmap)

    newmap.on('locationfound', onLocationFound)

    newmap.locate({ setView: true, watch: true, enableHighAccuracy: true })

    const markers = L.layerGroup().addTo(newmap)

    function onLocationFound (e) {
      component.center = e.latlng
      component.radius = e.accuracy

      component.posLat = e.latlng.lat
      component.posLon = e.latlng.lng

      markers.clearLayers()

      L.marker(e.latlng).addTo(markers)
    }
  },
  methods: {
    sendData () {
      const component = this
      axios({
        method: 'POST',
        url: 'https://iotsundsvall.northeurope.cloudapp.azure.com/api/graphql',
        data: {
          query: `
            mutation CreateNew($dep: NewSnowdepthMeasurement!) {
              addSnowdepthMeasurement(input: $dep) {
                from {
                  pos {
                    lon
                    lat
                  }
                }
                depth
                when
              }
            }
          `,
          variables: {
            'dep': {
              'pos': {
                'lon': component.posLon,
                'lat': component.posLat
              },
              'depth': component.slider
            }
          }
        },
        headers: { 'content-type': 'application/json' }
      }).then(
        (result) => {
          // restting data and error so that eslint doesn't complain
          result.data = ''
          component.successAlert = true
        }, (error) => {
          error = ''
          component.errorAlert = true
        }
      )
    }
  }
}
</script>
