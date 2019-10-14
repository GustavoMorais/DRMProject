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
                <v-btn to="/registro" :href="source" icon large v-on="on">
                  <v-icon>mdi-account-plus-outline</v-icon>
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
            <v-btn block color="primary" :loading="loading" :disabled="loading" @click="login">Acessar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import Vue from "vue";
import router from "vue-router";

export default {
  name: "login",
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    loader: null,
    loading: false
  }),
  methods: {
    async login() {
      this.loader = "loading";
      if ($("#login").val() !== "" && $("#password").val() !== "") {
        // vou testar
        const response = await $.ajax(
          {
            type: "POST",
            url: "http://localhost/rmd/login.php",
            data: {
              username: btoa($("#login").val()),
              password: btoa($("#password").val())
            }
          },
          "json"
        );
        
        if (response.status === "done") {
          console.log(response.token);
          this.$router.push({ name: 'home', params: { token: response.token }});
        } else {
          //apresentar mensagem de falha
          this.loader = null;
          this.$dialog.error({
            text: 'Usuário ou Senha inválidos',
            title: ' Falha ao conectar',
            icon: 'mdi-account-alert',
            actions: {
              close: 'Fechar'
            }
          })
        }
      }
    }
  }
};
</script>
