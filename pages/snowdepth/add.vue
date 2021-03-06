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
          :disabled="isDisabled"
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
import Snowdepth from '../../components/models/snowdepth.model'
import MeasurementPosition from '../../components/models/measurementPosition.model'

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
      errorAlert: false,
      isDisabled: true,
      image: require('@/static/assets/images/gps_fixed.png')
    }
  },
  mounted () {
    const L = this.$L
    const component = this
    const newMap = L.map('map').setView([62.3908, 17.3069], 13)
    const locationIcon = L.icon({
      iconUrl: component.image,
      iconSize: [38, 38],
      iconAnchor: [0, 0]
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20
    }).addTo(newMap)

    const doTest = false
    const markers = L.layerGroup().addTo(newMap)
    const sensorMarkers = L.layerGroup().addTo(newMap)
    let userInteracted = false

    if (doTest) {
      const data = testData() // test case
      placeSensors(data)
    } else {
      getSensors()
    }

    newMap.locate({ setView: false, watch: true, enableHighAccuracy: true, timeout: 1000, maximumAge: 10000 })

    newMap.on('dragstart', function () {
      userInteracted = true
    })

    newMap.on('locationfound', onLocationFound)
    newMap.on('locationerror', onLocationError)

    function onLocationError (e) {
    }

    function onLocationFound (e) {
      const latitude = e.latlng.lat
      const longitude = e.latlng.lng

      if (userInteracted === false) {
        newMap.setView(e.latlng)
      }

      component.isDisabled = true

      component.posLat = e.latlng.lat
      component.posLon = e.latlng.lng

      markers.clearLayers()

      L.marker(e.latlng, { icon: locationIcon }).addTo(markers)

      if (longitude < 15.516210 || longitude > 17.975816) {
        return
      }

      if (latitude < 62.042301 || latitude > 62.648987) {
        return
      }

      component.isDisabled = false
    }

    function getSensors () {
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
          placeSensors(result)
        }
      )
    }

    function testData () {
      const randomnumber = Math.floor(Math.random() * (25 - 1 + 1)) + 1

      const data = {
        data: {
          data: {
            snowdepths: [
              new Snowdepth(new MeasurementPosition(62.3901, 17.3062), '2020-03-09T10:20:22Z', randomnumber, false),
              new Snowdepth(new MeasurementPosition(62.3910, 17.3075), '2020-03-09T10:30:22Z', randomnumber, false)
            ]
          }
        }
      }

      return data
    }

    function placeSensors (data) {
      sensorMarkers.clearLayers()

      const results = data.data.data.snowdepths

      for (let i = 0; i < results.length; i++) {
        const latlng = { lat: results[i].from.pos.lat, lon: results[i].from.pos.lon }

        if (results[i].manual === false) {
          L.marker(latlng).addTo(sensorMarkers)
        }
      }

      const markerOverlays = {
        'Snödjupsmätare': sensorMarkers
      }

      L.control.layers(null, markerOverlays).addTo(newMap)
    }

    // extending L.Control to create a container that lies on top of the map. The button is created inside this container.
    const MyControl = L.Control.extend({
      options: {
        position: 'bottomright'
      },
      onAdd: function (map) {
        const container = L.DomUtil.create('div', 'my-custom-control')
        const button = L.DomUtil.create('button', '', container).append('Center')

        L.DomEvent.on(container, 'click', function (e) {
          userInteracted = false
          map.fire('locationfound', { latlng: { lat: component.posLat, lng: component.posLon } })
        })

        return container
      }
    })

    newMap.addControl(new MyControl())
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
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
