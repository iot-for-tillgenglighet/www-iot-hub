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
          Felrapportering
        </h1>
        <p>
          Välj vilken typ av fel du vill rapportera.
        </p>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card
              @click="sendFel1"
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
  methods: {
    sendFel1 () {
      console.log('Snöröjning')
    },
    sendFel2 () {
      console.log('Halka')
    },
    sendFel3 () {
      console.log('Something...')
    }
  }
}
</script>
