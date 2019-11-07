<template>
  <div>
    <v-list two-line subheader>
      <v-subheader>Informações do Projeto</v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Nome do Projeto</v-list-item-title>
          <v-list-item-subtitle>{{ nomedoprojeto }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Empresa</v-list-item-title>
          <v-list-item-subtitle>{{ empresa }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Responsável</v-list-item-title>
          <v-list-item-subtitle>{{ responsavel }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Descrição</v-list-item-title>
          <v-list-item-subtitle>{{ descricao }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Valor do Projeto</v-list-item-title>
          <v-list-item-subtitle>{{ valordoprojeto }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Data do Projeto</v-list-item-title>
          <v-list-item-subtitle>{{datadoprojeto}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <div class="bgdark">
    <v-subheader>Ações para o Projeto</v-subheader>
    <v-col class="text-center" cols="12" sm="12">
      <div class="my-0">
        <v-btn block text><v-icon left>mdi-pencil</v-icon> Editar as Informações</v-btn>
        <v-btn block text small color="error"><v-icon left>mdi-delete</v-icon>Deletar o Projeto</v-btn>
      </div>
    </v-col>
    </div>
    <v-divider></v-divider>

    <v-list subheader two-line flat>
      <v-subheader>Riscos</v-subheader>

      <v-list-item-group multiple>
        <v-list-item :ripple="false" v-for="(item, index) in listrisco" :key="index">
          <template>
            <v-list-item-action style="margin-right: 12px;" :key="index">
              <v-switch v-model="selected" @click="checkbox_select($event)" inset :ripple="false" color="primary" :value="item.idtarget"></v-switch>
            </v-list-item-action>

            <v-list-item-content :key="item.idtarget">
              <v-list-item-title v-html="item.nome"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-btn fab dark large color="primary" to="/newrisk" fixed right bottom>
        <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
      return {
        selected: [],
        listrisco: [],
        nomedoprojeto: "carregando...",
        empresa: "carregando...",
        responsavel: "carregando...",
        descricao: "carregando...",
        valordoprojeto: "carregando...",
        datadoprojeto: "carregando..."
      }
  },
  methods: {
    async checkbox_select(evento) {
      const resultado = await $.ajax({
        type: "POST",
        url: "https://dl.lucaspanao.ml/data.php",
        data: {
            projetoid: this.$session.get("projectviewid"),
            idtarget: evento.target.value,
            checked: evento.target.checked,
            token: this.$session.get("token"),
            mode: 7
        }
      }, "json");

      if(resultado){
        console.log(resultado);
      }
    }
  },
  async created () {
      if(this.$session.has("projectviewid")){
        const resultado = await $.ajax({
            type: "POST",
            url: "https://dl.lucaspanao.ml/data.php",
            data: {
                idprojeto: this.$session.get("projectviewid"),
                token: this.$session.get("token"),
                mode: 4
            }
        }, "json");
        if (resultado) {
            this.nomedoprojeto = resultado.nome;
            this.empresa = resultado.empresa ? resultado.empresa:"Nenhuma empresa cadastrada";
            this.responsavel = resultado.responsavel;
            this.descricao = resultado.descricao ? resultado.descricao:"Nenhuma descrição cadastrada";
            this.valordoprojeto = resultado.valor;
            this.datadoprojeto = new Date(resultado.registrado * 1000).toLocaleDateString("pt-BR");
        }

        const resultado2 = await $.ajax({
            type: "POST",
            url: "https://dl.lucaspanao.ml/data.php",
            data: {
                idprojeto: this.$session.get("projectviewid"),
                token: this.$session.get("token"),
                mode: 6
            }
        }, "json");
        if (resultado2) {
          console.log(this.$session.get("projectviewid"))
          resultado2.forEach(elemento => {
            this.listrisco.push({
              idtarget: elemento.id,
              nome: elemento.nome,
              checked: elemento.project_id === this.$session.get("projectviewid") ? true:false
            });
            console.log(elemento.project_id === this.$session.get("projectviewid") ? elemento.id:0)
            this.selected.push(elemento.project_id === this.$session.get("projectviewid") ? elemento.id:0)
          });
        }
      }else{
        this.$router.push('/home').catch(err => {})
      } 
  },
};
</script>
<style scoped>
.bgdark {
  background: #424242 !important;
}
</style>