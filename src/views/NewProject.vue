<template>
  <div>
    <NavBar></NavBar>
    <v-form class="mx-5" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
              <h3>Preencha todos os dados solicitados</h3>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="Nome do Projeto"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Empresa"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Gerente Responsável"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Data"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Valor do Projeto"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <div class="text-center">
                <v-btn block rounded color="primary" dark>Adicionar Projeto</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";

export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  components: {
    NavBar
  }
};
</script>