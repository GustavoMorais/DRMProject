<template>
  <v-app dark>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "RMD",
  data: () => ({
    //
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
};
</script>
