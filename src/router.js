import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    /* AUTENTICAÇÃO */
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/registro",
      name: "registro",
      component: () => import("./views/CreateAccount.vue")
    },

    /* DASHBOARD */
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/newproject",
      name: "newproject",
      component: () => import("./views/NewProject.vue")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("./views/Logout.vue")
    },

    /* INFORMAÇÕES DO PROJETO */
    {
      path: "/projectinfo",
      name: "projectinfo",
      component: () => import("./views/ProjectDetails.vue")
    },
    {
      path: "/newrisk",
      name: "newrisk",
      component: () => import("./views/NewRisk.vue")
    },
    {
      path: "/risklist",
      name: "risklist",
      component: () => import("./views/RiskList.vue")
    }
  ]
});
