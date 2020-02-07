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
              class="justify-center"
            >
              <v-card-title
                v-text="card.title"
                primary-title
                class="justify-center white--text"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </client-only>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    cards: [
      {
        title: 'Snöröjning',
        flex: 12,
        style: {
          color: 'blue lighten-2'
        }
      },
      {
        title: 'Halka',
        flex: 12,
        style: {
          color: 'blue'
        }
      },
      {
        title: 'Something',
        flex: 12,
        style: {
          color: 'blue darken-2'
        }
      }
    ]
  }),
  mounted () {
    axios({
      method: 'GET',
      url: process.env.baseUrl + '/api/graphql?query={snowdepths{from{pos{lat,lon}}when,depth}}'
    }).then(
      (result) => {
        console.log(result.data.data.snowdepths)
      }
    )
  },
  methods: {
    sendProblem () {
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
                'lon': '',
                'lat': ''
              },
              'depth': ''
            }
          }
        },
        headers: { 'content-type': 'application/json' }
      }).then(
        (result) => {
          // resetting data and error so that eslint doesn't complain
          result.data = ''
        }, (error) => {
          error = ''
        }
      )
    }
  }
}
</script>
