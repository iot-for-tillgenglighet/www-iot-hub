<template>
  <v-card>
    <NuxtLink :to="'/nyamatvarden'" />
    <span v-html="stuff"></span>
  </v-card>
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
