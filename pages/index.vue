<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Välkommen till IoT för tillgänglighet.
        </v-card-title>
        <v-card-text>
          <p>Här kommer det att finnas saker, snart.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="white--text"
            color="blue"
            nuxt
            to="/snodjup"
          >
            Snödjup
          </v-btn>
          <v-spacer />
          <v-btn
            class="white--text"
            color="blue"
            nuxt
            to="/felrapport"
          >
            Felrapportering
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>
