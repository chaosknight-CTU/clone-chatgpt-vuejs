import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/LoginPage/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/pages/RegisterPage/RegisterPage.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  try {
    if (!store.authed) await store.fetchUserInfo();
  } catch (error) {
    if (!to.path.startsWith("/login") && !to.path.startsWith("/register")) {
      return "/login";
    }
  }
});

export default router;
