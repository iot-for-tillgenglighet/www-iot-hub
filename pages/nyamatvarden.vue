<template>
  <client-only>
    <v-container
      class="mx-auto text-justify"
    >
      <v-btn :to="'/'" v-text="'Hem'" color="blue" text />
      <v-btn :to="'/snodjup'" v-text="'Snödjup Översikt'" color="blue" text />
      <NuxtLink :to="'/nyamatvarden'" />
      <div v-html="stuff" />
      <br>
      <v-btn :to="'/matvarden'" v-text="'Tidigare mätvärden'" color="blue" text />
    </v-container>
  </client-only>
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

<style lang="scss">
div.form-group {
  & label {
    text-justify: auto;
  }
  & input#depth.form-control.valid {
    padding: 10px;
    justify-items: auto;
    width: 250px;
  }
  & input#temperature.form-control.valid {
    padding: 10px;
    justify-items: auto;
    width: 250px;
  }
  & textarea {
    padding: 10px;
    justify-items: auto;
    width: 250px;
  }
}
</style>
