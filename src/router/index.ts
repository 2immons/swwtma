import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import HomeView from "../views/HomeView.vue";
import TasksView from "../views/TasksView.vue";
import SettingsView from "../views/SettingsView.vue";
import KarmaView from "../views/KarmaView.vue";
import MiningView from "../views/MiningView.vue";
import FriendsView from "../views/FriendsView.vue";
import PromoTaskView from "../views/PromoTaskView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TasksView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/karma",
    name: "karma",
    component: KarmaView,
  },
  {
    path: "/mining",
    name: "mining",
    component: MiningView,
  },
  {
    path: "/friends",
    name: "friends",
    component: FriendsView,
  },
  {
    path: "/tasks/promo-task/:promo_task_id",
    name: "promo-task",
    component: PromoTaskView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      document.getElementById("app")?.scrollIntoView({ behavior: "instant" });
      return { top: 0 };
    }
  },
});

export default router;
