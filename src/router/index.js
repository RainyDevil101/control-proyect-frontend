import { createRouter, createWebHistory } from "vue-router";

import auth from "../modules/auth/router";
import home from "../modules/home/router";
import loading from "../modules/load/router";
import authGuard from "../modules/auth/router/auth-guard";
import redirect from "../modules/auth/router/redirect";
import admin from "../modules/auth/router/admin-guard";
import usersAdmin from "../modules/usersAdmin/router";
import material from "../modules/material/router";
import refund from "../modules/refund/router";
import adminRefund from "../modules/adminRefund/router"
import operatorRefund from "../modules/operatorRefund/router";
import dashboard from "../modules/dashboard/router";
import planner from "../modules/auth/router/planner-verification";
import refunder from "../modules/auth/router/refunder-verification";
import operator from "../modules/auth/router/operator-verification";

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
    path: "/users-admin",
    beforeEnter: [authGuard],
    beforeEnter: [admin],
    ...usersAdmin,
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
  {
    path: "/refund",
    beforeEnter: [authGuard],
    beforeEnter: [refunder],
    ...refund,
  },
  {
    path: "/operatorRefund",
    beforeEnter: [authGuard],
    beforeEnter: [operator],
    ...operatorRefund,
  },
  {
    path: "/adminRefund",
    beforeEnter: [authGuard],
    beforeEnter: [refunder],
    ...adminRefund,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
