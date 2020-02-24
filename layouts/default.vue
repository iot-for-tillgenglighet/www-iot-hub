<template>
  <v-app>
    <client-only>
      <v-navigation-drawer
        v-model="drawer"
        :clipped="clipped"
        fixed
        temporary
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        :clipped-left="clipped"
        fixed
        app
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn
          :to="to"
          v-text="title"
          text
        />
      </v-app-bar>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
      <v-footer
        :fixed="fixed"
        app
      >
        <span>&copy; 2019</span>
      </v-footer>
    </client-only>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Välkommen',
          to: '/'
        },
        {
          icon: 'mdi-weather-partly-cloudy',
          title: 'Väder',
          to: '/weather'
        },
        {
          icon: 'mdi-snowflake',
          title: 'Snödjup',
          to: '/snowdepth/overview'
        },
        {
          icon: 'mdi-alert-outline',
          title: 'Problemrapportering',
          to: '/problemreport/overview'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'IoT FÖR TILLGÄNGLIGHET',
      to: '/'
    }
  }
}
</script>
