<template>
  <v-container
    align-center
    justify-center
  >
    <v-btn text color="blue" :to="'/'" v-text="'Hem'" />
    <v-btn text color="blue" :to="'/snodjup'" v-text="'Snödjup Översikt'" />
    <NuxtLink :to="'/nyamatvarden'" />
    <div class="nymat" v-html="stuff" />
    <br>
    <v-btn text color="blue" :to="'/matvarden'" v-text="'Tidigare mätvärden'" />
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    const { data } = await axios.get('http://labiotsundsvall.northeurope.cloudapp.azure.com/counter')
    return { stuff: data }
  }
}
</script>
