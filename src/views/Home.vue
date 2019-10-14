<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 v-text="$route.params.token"></h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: $route.params.token
    }
  },
}
</script>