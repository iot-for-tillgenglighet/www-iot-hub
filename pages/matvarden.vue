<template>
  <v-container
    align-center
    justify-center
  >
    <v-btn :to="'/'" v-text="'Hem'" color="blue" text />
    <v-btn :to="'/snodjup'" v-text="'Snödjup Översikt'" color="blue" text />
    <NuxtLink :to="'/matvarden'" />
    <div v-html="stuff" class="mat" />
    <br>
    <v-btn :to="'/nyamatvarden'" v-text="'Lägg till mätvärden'" color="blue" text />
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    const { data } = await axios.get('http://localhost:8880/fetchdata')
    return { stuff: data }
  }
}
</script>
