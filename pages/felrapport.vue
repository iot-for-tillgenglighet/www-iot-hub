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
              @click="card.method"
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
        title: 'Vägskada',
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
        title: 'Otrygghet',
        flex: 12,
        style: {
          color: 'blue darken-2'
        }
      }
    ]
  }),
  methods: {
    sendVagskada () {
      axios({
        method: 'POST',
        url: process.env.baseUrl + '/api/graphql',
        data: {
          query: `
            mutation CreateNew($dep: NewVagskada!) {
              addVagskada(input: $dep) {
                from {
                  pos {
                    lon
                    lat
                  }
                }
                type
              }
            }
          `,
          variables: {
            'dep': {
              'pos': {
                'lon': '',
                'lat': ''
              },
              'type': 'Vägskada'
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
    },
    sendHalka () {
      axios({
        method: 'POST',
        url: process.env.baseUrl + '/api/graphql',
        data: {
          query: `
            mutation CreateNew($dep: NewHalka!) {
              addHalka(input: $dep) {
                from {
                  pos {
                    lon
                    lat
                  }
                }
                type
              }
            }
          `,
          variables: {
            'dep': {
              'pos': {
                'lon': '',
                'lat': ''
              },
              'type': 'Vägskada'
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
    },
    sendOtrygg () {
      axios({
        method: 'POST',
        url: process.env.baseUrl + '/api/graphql',
        data: {
          query: `
            mutation CreateNew($dep: NewOtrygg!) {
              addOtrygg(input: $dep) {
                from {
                  pos {
                    lon
                    lat
                  }
                }
                type
              }
            }
          `,
          variables: {
            'dep': {
              'pos': {
                'lon': '',
                'lat': ''
              },
              'type': 'Otrygg'
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
