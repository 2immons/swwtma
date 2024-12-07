import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("../views/TasksView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/SettingsView.vue"),
  },
  {
    path: "/karma",
    name: "karma",
    component: () => import("../views/KarmaView.vue"),
  },
  {
    path: "/mining",
    name: "mining",
    component: () => import("../views/MiningView.vue"),
  },
  {
    path: "/friends",
    name: "friends",
    component: () => import("../views/FriendsView.vue"),
  },
  {
    path: '/tasks/promo-task/:promo_task_id',
    name: 'promo-task',
    component: () => import("../views/PromoTaskView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
