export default {

    name: 'users-admin',
    component: () => import(/* webpackChunkName: "register" */ '@/modules/usersAdmin/layouts/UsersAdmin.vue'),
    children: [
        {
            path: 'regist',
            name: 'regist-user',
            component: () => import(/* webpackChunkName: "regist" */ '@/modules/usersAdmin/views/RegistUser.vue'),
        },
        {
            path: 'user-list',
            name: 'user-list',
            component: () => import(/* webpackChunkName: "user-list" */ '@/modules/usersAdmin/views/UsersList.vue'),
        },
        {
            path: 'massive-registers',
            name: 'massive-registers',
            component: () => import(/* webpackChunkName: "massive-register" */ '@/modules/usersAdmin/views/RegistUserMassive.vue'),
        },
        {
            path: 'regist-destination',
            name: 'regist-destination',
            component: () => import(/* webpackChunkName: "regist-destination" */ '@/modules/usersAdmin/views/RegistDestination.vue'),
        },
    ]
}