import { createWebHistory, createRouter } from "vue-router";
import Search from "../components/Search.vue";

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search,
    props: true
  },
  // {
  //   path: "/:path(.*)",
  //   name: "NotFound",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
