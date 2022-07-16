export default {

    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/layout/AuthLayout.vue'),
    children: [
        {
            path: '/',
            name: 'select-login',
            component: () => import(/* webpackChunkName: "select-login" */ '@/modules/auth/views/SelectLogin.vue'),
        },
        {
            path: '',
            name: 'front-auth',
            component: () => import(/* webpackChunkName: "front-auth" */ '@/modules/auth/views/AuthView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import(/* webpackChunkName: "not-found" */ '@/modules/auth/views/NotFound.vue'),
        },
    ]
}