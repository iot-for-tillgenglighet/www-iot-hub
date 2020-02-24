<template>
  <v-container
    class="mx-auto text-center"
  >
    <h1>
      Snödjupskontrollen
    </h1>
    <v-container
      fluid
    >
      <p>För att lägga till en manuell snödjupsmätning, vänligen navigera till "Lägg till mätvärden". För att se tidigare mätvärden, vänligen navigera till "Tidigare mätvärden".</p>
      <v-btn :to="'/snowdepths/add'" v-text="'Lägg till mätvärden'" color="blue" text />
      <v-btn :to="'/snowdepths/overview'" v-text="'Tidigare mätvärden'" color="blue" text />
    </v-container>
  </v-container>
</template>

<script>

</script>
