export default {
    name: 'admin-refund',
    component: () => import(/* webpackChunkName: "admin refund" */ '@/modules/adminRefund/layouts/AdminRefundLayout.vue'),
    children: [
        {
            path: 'admin-clients',
            name: 'admin-clients',
            component: () => import(/* webpackChunkName: "admin refund clients" */ '@/modules/adminRefund/views/AdminClients.vue')
        },
        {
            path: 'admin-places',
            name: 'admin-places',
            component: () => import(/* webpackChunkName: "admin refund places" */ '@/modules/adminRefund/views/AdminPlaces.vue')
        },
        {
            path: 'admin-reports',
            name: 'admin-reports',
            component: () => import(/* webpackChunkName: "admin refund reports" */ '@/modules/adminRefund/views/AdminReports.vue')
        },
    ]
}