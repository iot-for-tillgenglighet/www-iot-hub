/* eslint-disable */

<template>
  <client-only>
    <v-layout
      justify-center
      align-center
    >
      <v-container
        fluid
        elevation="0"
        class="text-center"
      >
        <h1>
          Problemrapportering
        </h1>
        <p>
          Välj vilken typ av problem du vill rapportera.
        </p>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card
              v-bind="card.style"
              @click="sendReport(card.reportType)"
              class="justify-center"
            >
              <v-card-title
                v-text="card.title"
                primary-title
                class="justify-center white--text"
              />
            </v-card>
          </v-col>
          <v-col>
            <v-alert
              v-model="successAlert"
              dense
              outlined
              type="success"
            >
              Felrapport skickad.
            </v-alert>
            <v-alert
              v-model="errorAlert"
              dense
              outlined
              type="error"
            >
              Felrapport ej skickad.
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </client-only>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      cards: [
        {
          title: 'Vägskada',
          flex: 12,
          style: {
            color: 'blue lighten-2'
          },
          reportType: 'type_road'
        },
        {
          title: 'Halka',
          flex: 12,
          style: {
            color: 'blue'
          },
          reportType: 'type_ice'
        },
        {
          title: 'Otrygghet',
          flex: 12,
          style: {
            color: 'blue darken-2'
          },
          reportType: 'type_unsafe'
        }
      ],
      posLat: 0,
      posLon: 0,
      successAlert: false,
      errorAlert: false
    }
  },
  mounted () {
    const component = this
    navigator.geolocation.watchPosition(function (position){
      component.posLat = position.coords.latitude
      component.posLon = position.coords.longitude
    })
  },
  methods: {
    sendReport (reportType) {
      const component = this

      if (component.posLon < 15.516210 || component.posLon > 17.975816)
        return

      if (component.posLat < 62.042301 || component.posLat > 62.648987)
        return

      axios({
        method: 'POST',
        url: process.env.baseUrl + '/api/graphql',
        data: {
          query: `
            mutation create($res: ProblemReportCreateResource!) {
              create(input: $res) {
                pos {
                  lon
                  lat
                }
                type
              }
            }
          `,
          variables: {
            'res': {
              'pos': {
                'lon': component.posLon,
                'lat': component.posLat
              },
              'type': reportType
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
