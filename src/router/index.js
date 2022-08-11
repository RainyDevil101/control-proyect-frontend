import { createRouter, createWebHistory } from "vue-router";

import auth from "../modules/auth/router";
import home from "../modules/home/router";
import loading from "../modules/load/router";
import authGuard from "../modules/auth/router/auth-guard";
import redirect from "../modules/auth/router/redirect";
import admin from "../modules/auth/router/admin-guard";
import register from "../modules/register/router";
import material from "../modules/material/router";
import dashboard from "../modules/dashboard/router";
import planner from "../modules/auth/router/planner-verification";

const routes = [
  {
    path: "/",
    ...auth,
  },
  {
    path: "/home",
    beforeEnter: [authGuard],
    ...home,
  },
  {
    path: "/load",
    beforeEnter: [authGuard],
    beforeEnter: [redirect],
    ...loading,
  },
  {
    path: "/register",
    beforeEnter: [authGuard],
    beforeEnter: [admin],
    ...register,
  },
  {
    path: "/material",
    beforeEnter: [authGuard],
    ...material,
  },
  {
    path: "/dashboard",
    beforeEnter: [authGuard],
    beforeEnter: [planner],
    ...dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
