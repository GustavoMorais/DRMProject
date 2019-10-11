<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Informe os seus dados</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon>mdi-lifebuoy</v-icon>
                </v-btn>
              </template>
              <span>Ajuda</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Usuário" id="login" prepend-icon="mdi-account" type="text"></v-text-field>
              <v-text-field label="Senha" id="password" prepend-icon="mdi-lock" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn block color="primary" :loading="loading" :disabled="loading" id="btnlogin" @click="loader = 'loading'">Acessar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    loader: null,
    loading: false
  }),
  mounted: function () {
    $("#btnlogin").click(function (e) {
      if($("#login").val() !== "" && $("#password").val() !== ""){
        $.ajax({
          type: "POST",
          url: "https://despnet-sys.com/system/testedev2019/login.php",
          data: {
            username: btoa($("#login").val()),
            password: btoa($("#password").val())
          },
          success: function (response) {
            if(response.status === "done"){
              router.push({ path: 'home' })
            }
          }
        }, "json");
      }
      
    });
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>