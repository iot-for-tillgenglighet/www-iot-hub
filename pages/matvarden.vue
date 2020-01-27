<template>
  <v-container
    class="mx-auto text-center"
  >
    <div id="map-wrap" class="mx-auto text-center">
      <client-only>
        <l-map :zoom="13" :center="center" style="height: 80vh; width: 80vw;">
          <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="center" />
        </l-map>
      </client-only>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      center: [62.3908, 17.3069],
      posLat: 0,
      posLon: 0
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
    getData () {
      axios({
        method: 'POST',
        url: 'http://localhost:8282/api/graphql',
        data: {
          query: `
            {
            snowdepths {
              from {
                pos {
                  lat
                  lon
                }
              }
              depth
              when
            }
          }
        `
        }
      }).then(
        (result) => {
          console.log(result.data)
        }, (error) => {
          console.error(error)
        }
      )
    }
  }
}
</script>
