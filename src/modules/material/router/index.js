export default {

    name: 'material',
    component: () => import(/* webpackChunkName: "register" */ '@/modules/material/layouts/MaterialLayout.vue'),
    children: [
        {
            path: 'menu',
            name: 'menu-materials',
            component: () => import(/* webpackChunkName: "menu-materials" */ '@/modules/material/views/MenuMaterials.vue'),
        },
        {
            path: 'get-material',
            name: 'get-material',
            component: () => import(/* webpackChunkName: "get-pendientes" */ '@/modules/material/views/GetMaterial.vue'),
        },
        {
            path: 'get-all-material',
            name: 'get-all-material',
            component: () => import(/* webpackChunkName: "get-todas" */ '@/modules/material/views/GetAllMaterial.vue'),
        },
        {
            path: 'dispatch/:id',
            name: 'dispatch-material',
            component: () => import(/* webpackChunkName: "dispath-material" */ '@/modules/material/views/DispatchMaterial.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
        {
            path: 'create-material',
            name: 'create-material',
            component: () => import(/* webpackChunkName: "create-material" */ '@/modules/material/views/CreateMaterial.vue'),
        },
        // {
        //     path: 'all/:id',
        //     name: 'all-material',
        //     component: () => import(/* webpackChunkName: "all-material" */ '@/modules/material/views/AllMaterial.vue'),
        //     props: (route) => {
        //         id: route.params.id
        //     },
        // },
    ]
}