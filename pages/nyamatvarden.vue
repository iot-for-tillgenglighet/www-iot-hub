<template>
  <v-container
    class="mx-auto text-center"
  >
    <div id="map-wrap" class="mx-auto text-center">
      <client-only>
        <l-map :zoom="13" :center="center" style="height: 50vh; width: 80vw;">
          <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="center" />
          <l-circle :lat-lng="center" :radius="radius" />
        </l-map>
      </client-only>
    </div>
    <v-card-text class="mx-auto align-center">
      <v-row>
        <v-subheader>Snödjup i millimeter</v-subheader>
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
    </v-card-text>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      center: [37.14, 115.483],
      radius: 0,
      min: 0,
      max: 100,
      slider: '',
      range: [0, 100],
      posLat: 0,
      posLon: 0,
      successAlert: false,
      errorAlert: false
    }
  },
  mounted () {
    const L = this.$L
    const mymap = L.map('map-wrap')

    const component = this

    function onLocationFound (e) {
      component.center = e.latlng
      component.radius = e.accuracy

      component.posLat = e.latlng.lat
      component.posLon = e.latlng.lng
    }
    mymap.on('locationfound', onLocationFound)

    mymap.locate({ setView: true, watch: true, enableHighAccuracy: true })
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
          console.log(result.data)
          component.successAlert = true
        }, (error) => {
          console.error(error)
          component.errorAlert = true
        }
      )
    }
  }
}
</script>
