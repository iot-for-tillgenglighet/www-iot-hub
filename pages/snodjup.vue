<template>
  <v-container
    class="mx-auto text-center"
  >
    <h1>
      Snödjupskontrollen!
    </h1>
    <v-container
      fluid
    >
      <p>Närmaste snödjupsmätare med sensor finns 1,4 km från din aktuella position. Den har mätt ett snöfall på 123 mm senaste dygnet. Se din aktuella position samt sensorernas positioner på kartan nedan. För att lägga till en manuell snödjupsmätning, vänligen navigera till "Lägg till mätvärden".</p>
      <v-btn :to="'/nyamatvarden'" v-text="'Lägg till mätvärden'" color="blue" text />
      <v-btn :to="'/matvarden'" v-text="'Tidigare mätvärden'" color="blue" text />
    </v-container>
  </v-container>
</template>

<script>

</script>
