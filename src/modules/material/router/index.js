export default {

    name: 'material',
    component: () => import(/* webpackChunkName: "register" */ '@/modules/material/layouts/MaterialLayout.vue'),
    children: [
        {
            path: 'menu-materials',
            name: 'menu-materials',
            component: () => import(/* webpackChunkName: "menu-materials" */ '@/modules/material/views/MenuMaterials.vue'),
        },
        {
            path: 'create-material',
            name: 'create-material',
            component: () => import(/* webpackChunkName: "create-material" */ '@/modules/material/views/CreateMaterial.vue'),
        },
        {
            path: 'get-material',
            name: 'get-material',
            component: () => import(/* webpackChunkName: "get-pendientes" */ '@/modules/material/views/GetMaterial.vue'),
        },
        {
            path: 'get-completed-material',
            name: 'get-completed-material',
            component: () => import(/* webpackChunkName: "get-completas" */ '@/modules/material/views/GetCompletedMaterial.vue'),
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
            path: 'completed/:id',
            name: 'completed-material',
            component: () => import(/* webpackChunkName: "completed-material" */ '@/modules/material/views/CompletedMaterial.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
        {
            path: 'all/:id',
            name: 'all-material',
            component: () => import(/* webpackChunkName: "all-material" */ '@/modules/material/views/AllMaterial.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
    ]
}