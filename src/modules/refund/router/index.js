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
            path: 'create-refund',
            name: 'create-refund',
            component: () => import(/* webpackChunkName: "create-refund" */ '@/modules/refund/views/CreateRefund.vue'),
        },
    ]
}