import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
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
      path: "/projectinfo",
      name: "projectinfo",
      component: () => import("./views/ProjectDetails.vue")
    },
    {
      path: "/risklist",
      name: "risklist",
      component: () => import("./views/RiskList.vue")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("./views/Logout.vue")
    }
  ]
});
