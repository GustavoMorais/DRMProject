<template>
  <div>
    <NavBar></NavBar>
    <v-list three-line>
      <v-subheader>Projetos</v-subheader>
      <template v-for="(item, index) in items">
        <v-divider
          v-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.nome"
          @click=""
        >
          <v-list-item-avatar>
            <v-icon :class="item.nivel">{{item.icon}}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.nome"></v-list-item-title>
            <v-list-item-subtitle v-html="item.descricao"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="item.status"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-btn fab dark large color="primary" to="/newproject" fixed right bottom>
        <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue"

//Definições Comuns, para diminuir o consumo de banda
var ArrIcon       = ["mdi-shield-plus", "mdi-shield-search", "mdi-shield-search", "mdi-shield-alert", "mdi-shield-check"]
var ArrIconStyle  = ["display-1 grey--text", "display-1 yellow--text", "display-1 yellow--text text--darken-2", "display-1 yellow--text text--darken-4", "display-1 green--text text--accent-3"]
var ArrStatus     = ["<span class='grey--text'>Nenhum risco cadastrado</span>",
                      "<span class='yellow--text'>Probabilidade Baixa de Risco</span>",
                      "<span class='yellow--text text--darken-2'>Probabilidade Média de Risco</span>",
                      "<span class='yellow--text text--darken-4'>Probabilidade Alta de Risco</span>",
                      "<span class='green--text text--accent-3'>Projeto Finalizado</span>"]

export default {
  components: {
    NavBar,
  },
  data: () => ({
    items: [],
  }),
  async created() {
      const resultado = await $.ajax({
        type: "POST",
        url: "https://dl.lucaspanao.ml/data.php",
        data: {
          token: this.$session.get("token"),
          mode: 2
        }
      }, "json");
      if (resultado) {
        var tmpArray = [];
        $.each(resultado, function (idx, value) {
          tmpArray.push({icon: ArrIcon[value.status], nivel: ArrIconStyle[value.status], 
                        nome: value.nome + ' <span class="grey--text body-2">'+(new Date(value.registrado * 1000).toLocaleDateString("pt-BR"))+'</span>', 
                        descricao: "<span class='text--primary'>Resp: "+value.responsavel+"</span> &mdash; "+value.descricao, 
                        status: ArrStatus[value.status]});
          if(Object.keys(resultado).length !== (idx + 1)){
            tmpArray.push({ divider: true, inset: true });
          }
        });
        this.items = tmpArray;
      }
  }
};
</script>