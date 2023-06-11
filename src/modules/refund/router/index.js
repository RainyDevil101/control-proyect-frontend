export default {

    name: 'refund',
    component: () => import(/* webpackChunkName: "register refund" */ '@/modules/refund/layouts/RefundLayout.vue'),
    children: [
        {
            path: 'menu-refunds',
            name: 'menu-refunds',
            component: () => import(/* webpackChunkName: "menu-refunds" */ '@/modules/refund/views/MenuRefunds.vue'),
        },
        {
            path: 'get-completed-refund',
            name: 'get-completed-refund',
            component: () => import(/* webpackChunkName: "get-completed-refunds" */ '@/modules/refund/views/GetCompletedRefund.vue'),
        },
        {
            path: 'completed/:id',
            name: 'completed-refund',
            component: () => import(/* webpackChunkName: "completed-refund" */ '@/modules/refund/views/CompletedRefund.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
        {
            path: 'get-stored-refund',
            name: 'get-stored-refund',
            component: () => import (/* webpackChunkName: "Get-stored-refund" */ '@/modules/refund/views/GetStoredRefund.vue')
        },
        {
            path: 'stored/:id',
            name: 'stored-refund',
            component: () => import(/* webpackChunkName: "stored-refund" */ '@/modules/refund/views/StoredRefund.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
        {
            path: 'update-refund/:id',
            name: 'update-refund',
            component: () => import(/* webpackChunkName: "update-refund" */ '@/modules/refund/views/UpdatePendienteFiltered.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
        {
            path: 'create-refund',
            name: 'create-refund',
            component: () => import(/* webpackChunkName: "create-refund" */ '@/modules/refund/views/CreateRefund.vue'),
        },
        {
            path: 'get-dispatch-refund-admin',
            name: 'get-dispatch-refund-admin',
            component: () => import(/* webpackChunkName: "get-dispatch-refund-admin" */ '@/modules/refund/views/GetDispatchRefundAdmin.vue'),
        },
        {
            path: 'dispatch-refunds-admin/:id',
            name: 'dispatch-dash-refund-admin',
            component: () => import(/* webpackChunkName: "dispath-refund-admin" */ '@/modules/refund/views/DispatchRefundAdmin.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
    ]
}