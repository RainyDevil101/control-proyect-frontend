export default {

    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/modules/register/layouts/RegisterLayout.vue'),
    children: [
        {
            path: 'select-register',
            name: 'select-register',
            component: () => import(/* webpackChunkName: "select-register" */ '@/modules/register/views/SelectRegister.vue'),
        },
        {
            path: 'register-division',
            name: 'register-division',
            component: () => import(/* webpackChunkName: "register-division" */ '@/modules/register/views/RegistDivision.vue'),
        },
        {
            path: 'register-user',
            name: 'register-user',
            component: () => import(/* webpackChunkName: "register-user" */ '@/modules/register/views/RegistUser.vue'),
        },
    ]
}