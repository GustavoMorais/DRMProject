<template>
  <v-app dark>
    <v-app-bar app class="primary">
      <v-toolbar-title class="headline text-uppercase white--text">
        <span>RMD</span>
        <span class="font-weight-light"> beta</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <LoginPage />
    </v-content>
  </v-app>
</template>

<script>
import LoginPage from "./components/LoginBlock";

export default {
  name: "RMD",
  components: {
    LoginPage
  },
  data: () => ({
    //
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
};
</script>
