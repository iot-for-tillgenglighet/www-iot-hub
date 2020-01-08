<template>
  <client-only>
    <v-container
      class="mx-auto text-center"
    >
      <v-btn :to="'/'" v-text="'Hem'" color="blue" text />
      <v-btn :to="'/snodjup'" v-text="'Snödjup Översikt'" color="blue" text />
      <h1>tidigare mätvärden</h1>
      <p>Nedan listas tidigare registrerade mätvärden gjorda av dig.</p>
      <v-data-table
        :headers="headers"
      />
      <v-btn :to="'/nyamatvarden'" v-text="'Lägg till mätvärden'" color="blue" text />
    </v-container>
  </client-only>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'Plats',
          align: 'center',
          value: 'latlang'
        },
        {
          text: 'Snödjup',
          align: 'center',
          value: 'slider'
        },
        {
          text: 'Datum',
          align: 'center',
          value: 'date'
        },
        {
          text: 'Tid',
          align: 'center',
          value: 'time'
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
