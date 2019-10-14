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
              <v-text-field autocomplete="off" label="Usuário" id="login" prepend-icon="mdi-account" type="text"></v-text-field>
              <v-text-field autocomplete="off" label="Senha" id="password" prepend-icon="mdi-lock" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn block color="primary" :loading="loading" :disabled="loading" @click="login">Acessar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snacktext }}
      <v-btn color="blue" text @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
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
    //Snackbar
    snackbar: false,
    snacktext: null,
    timeout: 3000,
    //============
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
          this.$session.start()
          this.$session.set('token', response.token);
          this.$router.push('/home');
        } else {
          //apresentar mensagem de falha
          this.loader = null;
          this.snacktext = "Usuário ou senha inválido";
          this.snackbar = true;
        }
      }
    }
  }
};
</script>
