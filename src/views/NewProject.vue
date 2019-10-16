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
              v-model="projectname"
              :rules="ProjectRule"
              :counter="15"
              label="Nome do Projeto"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="descricao"
              :rules="DescRule"
              :counter="50"
              label="Descrição"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="empresa"
              :rules="EmpresaRule"
              :counter="15"
              label="Empresa"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="responsavel"
              :rules="RespRule"
              :counter="15"
              label="Gerente Responsável"
              required
            ></v-text-field>
          </v-col>

          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Data do Projeto"
                prepend-icon="mdi-calendar-clock"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancelar</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date), datadoprojeto = (new Date(date).getTime() / 1000)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="valor"
              :rules="ValorRule"
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
    modal: false,
    valid: false,
    datadoprojeto: null,
    firstname: "",
    lastname: "",
    ProjectRule : [
      v => !!v || "Você precisa especificar um nome",
      v => v.length <= 15 || "O nome deve ser menor do que 15 caracteres"
    ],
    DescRule: [
      v => v.length <= 50 || "Sua descrição precisa ser menor do que 50 caracteres"
    ],
    EmpresaRule: [
      v => v.length <= 15 || "O nome da empresa deve ser menor do que 15 caracteres"
    ],
    RespRule: [
      v => !!v || "Você precisa especificar um responsável",
      v => v.length <= 15 || "O nome do responsável deve ser menor do que 15 caracteres"
    ],
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