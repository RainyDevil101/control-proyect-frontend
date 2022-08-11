export default {

    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/modules/home/layout/HomeLayout.vue'),
    children: [
        {
            path: 'home-view',
            name: 'home-view',
            component: () => import(/* webpackChunkName: "Homeview" */ '@/modules/home/views/Homeview.vue'),
        },
    ]
}