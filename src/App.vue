<template>
  <v-app dark>
    <v-content>
      <NavBar></NavBar>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue"

export default {
  name: "RMD",
  components: {
    NavBar,
  },
  created () {
    this.$vuetify.theme.dark = true
  },
};
</script>
