<template>
  <v-container
    align-center
    justify-center
  >
    <v-btn :to="'/'" v-text="'Hem'" color="blue" text />
    <v-btn :to="'/snodjup'" v-text="'Snödjup Översikt'" color="blue" text />
    <NuxtLink :to="'/nyamatvarden'" />
    <div v-html="stuff" class="nymat" />
    <br>
    <v-btn :to="'/matvarden'" v-text="'Tidigare mätvärden'" color="blue" text />
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    const { data } = await axios.get('http://localhost:8880/counter')
    return { stuff: data }
  }
}
</script>
