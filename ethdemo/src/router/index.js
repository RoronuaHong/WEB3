import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AccountView from '../views/AccountView.vue';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () => 
      import(/* webpackChunkName: "about" */ "../views/AccountView.vue"),
  },
  {
    path: "/demo",
    name: "demo",
    component: () => 
      import(/* webpackChunkName: "about" */ "../views/DemoView.vue"),
  },
  {
    path: "/web3wallet",
    name: "web3wallet",
    component: () => 
      import(/* webpackChunkName: "about" */ "../views/Web3WalletView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
