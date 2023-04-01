export default {

    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/modules/register/layouts/RegisterLayout.vue'),
    children: [
        {
            path: '/register',
            name: 'select-register',
            component: () => import(/* webpackChunkName: "select-register" */ '@/modules/register/views/SelectRegister.vue'),
        },
        {
            path: 'register-destination',
            name: 'register-destination',
            component: () => import(/* webpackChunkName: "register-destination" */ '@/modules/register/views/RegistDestination.vue'),
        },
        {
            path: 'register-user',
            name: 'register-user',
            component: () => import(/* webpackChunkName: "register-user" */ '@/modules/register/views/RegistUser.vue'),
        },
        {
            path: 'register-user-massive',
            name: 'register-user-massive',
            component: () => import(/* webpackChunkName: "register-user-massive" */ '@/modules/register/views/UserMassiveRegistation.vue'),
        },
        {
            path: 'register-destination-massive',
            name: 'register-destination-massive',
            component: () => import(/* webpackChunkName: "register-destination-massive" */ '@/modules/register/views/DestinationMassiveRegistation.vue'),
        },
    ]
}