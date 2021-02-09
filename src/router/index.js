import { createWebHistory, createRouter } from "vue-router";
import HotelListing from "../components/HotelListing.vue";
import Search from "../components/Search.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search,
    props: true
  },
  {
    path: "/hotel-listing",
    name: "HotelListing",
    component: HotelListing,
    props: true
  },
  {
    path: "/:path(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
