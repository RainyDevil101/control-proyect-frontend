export default {

    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/modules/home/layout/HomeLayout.vue'),
    children: [
        {
            path: 'create-material',
            name: 'create-material',
            component: () => import(/* webpackChunkName: "create-material" */ '@/modules/home/views/CreateMaterial.vue'),
        },
    ]
}