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
            component: () => import(/* webpackChunkName: "send-get" */ '@/modules/material/views/GetMaterial.vue'),
        },
        {
            path: 'dispatch/:id',
            name: 'dispath-material',
            component: () => import(/* webpackChunkName: "dispath-material" */ '@/modules/material/views/DispatchMaterial.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
    ]
}