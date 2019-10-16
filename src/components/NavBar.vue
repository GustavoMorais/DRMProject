<template>
  <div>
    <v-app-bar app class="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase white--text">
        <span>RMD</span>
        <span class="font-weight-light">beta</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="userpic"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
          <v-list-item-subtitle>{{ usermail }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.local" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      username: "carregando...",
      usermail: null,
      userpic: "https://lucaspanao.ml/dl/assets/img/avatar.jpg",
      items: [
        { title: 'Inicio', icon: 'mdi-monitor-dashboard', local: "/home" },
        { title: 'Novo Projeto', icon: 'mdi-folder-plus', local: "/newproject" },
        { title: 'Lista de Riscos', icon: 'mdi-clipboard-list-outline', local: "/risklist" },
        { title: 'Sair', icon: 'mdi-exit-to-app', local: "/logout" },
      ],
      token: null
    };
  },
  async created() {
    if (this.$session.has("token")) {
      this.token = this.$session.get("token");

      const response = await $.ajax(
        {
          type: "POST",
          url: "https://dl.lucaspanao.ml/data.php",
          data: {
            token: this.token,
            mode: 1
          }
        },
        "json"
      );

      if (response.status !== "failed") {
        this.username = response.nome;
        this.usermail = response.email;
        //this.userpic = response.avatar;
      }else{
          this.$session.destroy();
          this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  }
};
</script>