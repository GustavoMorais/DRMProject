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

    <v-divider></v-divider>

    <v-list subheader two-line flat>
      <v-subheader>Riscos</v-subheader>

      <v-list-item-group v-model="listrisco" multiple>
        <v-list-item>
          <template v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox v-model="active" color="primary" @click="toggle"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Risco de exemplo</v-list-item-title>
              <v-list-item-subtitle>R$ 0,00 &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit purus sed convallis ullamcorper.</v-list-item-subtitle>
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
        listrisco: [],
        nomedoprojeto: "carregando...",
        empresa: "carregando...",
        responsavel: "carregando...",
        descricao: "carregando...",
        valordoprojeto: "carregando...",
        datadoprojeto: "carregando..."
      }
  },
  async created () {
      
      if(this.$session.has("projectviewid")){
        function numberToReal(numero) {
            var numero = numero.toFixed(2).split('.');
            numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
            return numero.join(',');
        }

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
            var atual = parseInt(resultado.valor);
            this.nomedoprojeto = resultado.nome;
            this.empresa = resultado.empresa ? resultado.empresa:"Nenhuma empresa cadastrada";
            this.responsavel = resultado.responsavel;
            this.descricao = resultado.descricao ? resultado.descricao:"Nenhuma descrição cadastrada";
            this.valordoprojeto = numberToReal(atual);
            this.datadoprojeto = new Date(resultado.registrado * 1000).toLocaleDateString("pt-BR");
        }
      }else{
        this.$router.push("/home");
      }
      
  },
};
</script>