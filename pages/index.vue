<template>
  <v-container
    class="mx-auto text-center"
  >
    <v-card-title
      class="headline justify-center"
    >
      Välkommen till IoT för Tillgänglighet
    </v-card-title>
    <v-card-text>Här kan du hitta info om väder och snödjup och lite annat, samt göra en felrapport om något inte är som det ska vara.</v-card-text>
    <v-container
      fluid
    >
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card
            :to="card.to"
            class="white--text"
            router
            exact
          >
            <v-img
              :src="card.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title" />
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: 'Väder',
        flex: 12,
        src: 'https://wi-images.condecdn.net/image/doEYpG6Xd87/crop/2040/f/weather.jpg',
        to: '/vader'
      },
      {
        title: 'Snödjup',
        flex: 6,
        src: 'https://i0.wp.com/www.heartmybackpack.com/wp-content/uploads/2017/01/IMG_3916.jpg',
        to: '/snodjup'
      },
      {
        title: 'Felrapportering',
        flex: 6,
        src: 'https://www.elegantthemes.com/blog/wp-content/uploads/2016/03/500-internal-server-error-featured-image-1.png',
        to: '/felrapport'
      }
    ]
  })
}
</script>
