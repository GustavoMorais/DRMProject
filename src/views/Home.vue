<template>
  <v-container>
    <NavBar></NavBar>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </v-container>
</template>
<script>
import NavBar from "../components/NavBar.vue"

export default {
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  async created() {
  }
};
</script>