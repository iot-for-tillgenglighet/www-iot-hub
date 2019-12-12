<template>
  <v-container
    class="mx-auto text-center"
  >
    <v-card-title
      class="headline justify-center"
    >
      Snödjupskontrollen!
    </v-card-title>
    <v-card-text>Närmaste snödjupsmätare med sensor finns 1,4 km från din aktuella position. Den har mätt ett snöfall på 123 mm senaste dygnet. Se din aktuella position samt sensorernas positioner på kartan nedan. För att lägga till en manuell snödjupsmätning, vänligen navigera till "Lägg till mätvärden".</v-card-text>
    <v-container
      fluid
    >
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card
            :to="card.to"
            color="blue"
            class="white--text"
            router
            exact
          >
            <v-card-title v-text="card.title" class="justify-center" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    cards: [
      {
        title: 'Lägg till mätvärden',
        flex: 6,
        to: '/nyamatvarden'
      },
      {
        title: 'Tidigare mätvarden',
        flex: 6,
        to: '/matvarden'
      }
    ]
  })
}
</script>
