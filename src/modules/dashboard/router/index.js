export default {

    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/modules/dashboard/layouts/DashboardLayout.vue'),
    children: [
        {
            path: '',
            name: 'dashboard-view',
            component: () => import(/* webpackChunkName: "dashboard-view" */ '@/modules/dashboard/views/DashboardView.vue'),
        },
        {
            path: '',
            name: 'data-menu',
            component: () => import(/* webpackChunkName: "data-menu" */ '@/modules/dashboard/views/DataMenu.vue'),
        },
        {
            path: 'get-completed-material',
            name: 'get-completed-material',
            component: () => import(/* webpackChunkName: "get-completas" */ '@/modules/dashboard/views/GetCompletedMaterial.vue'),
        },
        {
            path: 'completed/:id',
            name: 'completed-material',
            component: () => import(/* webpackChunkName: "completed-material" */ '@/modules/dashboard/views/CompletedMaterial.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
    ]
}