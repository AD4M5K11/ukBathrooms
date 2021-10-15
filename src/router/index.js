import { createWebHistory, createRouter } from "vue-router";
import Headlines from '../views/Headlines.vue';
import Headline from '../views/Headline.vue';

const routes = [
  {
    path: "/",
    name: "Headlines",
    component: Headlines,
  },
  {
    path: "/headline",
    name: "Headline",
    component: Headline,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
