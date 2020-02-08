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
        <transition name="fade">
          <v-alert
            v-model="successAlert"
            dense
            outlined
            type="success"
          >
            Nytt mätvärde sparat.
          </v-alert>
        </transition>
      </v-row>
      <v-row>
        <transition name="fade">
          <v-alert
            v-model="errorAlert"
            dense
            outlined
            type="error"
          >
            Mätvärde ej sparats.
          </v-alert>
        </transition>
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
      maxZoom: 18
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
        url: process.env.baseUrl + '/api/graphql',
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
          // resetting data and error so that eslint doesn't complain
          result.data = ''
          setTimeout(() => { component.successAlert = true }, 500)
          setTimeout(() => { component.successAlert = false }, 4000)
        }, (error) => {
          error = ''
          setTimeout(() => { component.errorAlert = true }, 500)
          setTimeout(() => { component.errorAlert = false }, 4000)
        }
      )
    }
  }
}
</script>

<style lang="scss">
  div.row {
    justify-content: center;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
