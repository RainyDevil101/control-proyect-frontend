import { createRouter, createWebHistory } from "vue-router";

import auth from "../modules/auth/router";
import home from "../modules/home/router";
import loading from "../modules/load/router";
import authGuard from "../modules/auth/router/auth-guard";
import redirect from "../modules/auth/router/redirect";
import adminSelector from "../modules/adminSelect/router";
import admin from "../modules/auth/router/admin-guard";
import register from "../modules/register/router";
import material from "../modules/material/router";

const routes = [
  {
    path: "/",
    ...auth,
  },
  {
    path: "/home",
    beforeEnter: [authGuard],
    // beforeEnter: [supervisor],
    ...home,
  },
  {
    path: "/load",
    beforeEnter: [authGuard],
    beforeEnter: [redirect],
    ...loading,
  },
  {
    path: "/select",
    beforeEnter: [authGuard],
    beforeEnter: [admin],
    ...adminSelector,
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
    beforeEnter: [admin],
    ...material,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
