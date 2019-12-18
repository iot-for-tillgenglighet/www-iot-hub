<template>
  <v-container>
    <div id="map-wrap" style="height: 100vh">
      <client-only>
        <l-map :zoom="13" :center="[47.413220, -1.219482]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="[47.413220, -1.219482]"></l-marker>
        </l-map>
      </client-only>
    </div>
    <v-btn>
      Click here
    </v-btn>
    <br>
    <input type="range" name="Snödjup" min="0" max="100">
    <br>
    <v-btn type="submit">
      Spara
    </v-btn>
  </v-container>
</template>

<script>

export default {
  mounted () {

  }
}
</script>

<style>
</style>
