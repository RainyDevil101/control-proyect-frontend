export default {

    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/modules/home/layout/HomeLayout.vue'),
    children: [
        {
            path: '',
            name: 'front-home',
            component: () => import(/* webpackChunkName: "front-home" */ '@/modules/home/views/HomeView.vue'),
        },
    ]
}