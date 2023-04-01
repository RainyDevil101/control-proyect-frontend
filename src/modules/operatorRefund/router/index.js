export default {

    name: 'operatorRefund',
    component: () => import(/* webpackChunkName: "register refund" */ '@/modules/operatorRefund/layouts/OperatorRefundLayout.vue'),
    children: [

        {
            path: 'get-dispatch-refund',
            name: 'get-dispatch-refund',
            component: () => import(/* webpackChunkName: "get-dispatch-refund" */ '@/modules/operatorRefund/views/GetOperatorRefundToDispatch.vue'),
        },
        {
            path: 'dispatch-refunds/:id',
            name: 'dispatch-dash-refund',
            component: () => import(/* webpackChunkName: "dispath-refund" */ '@/modules/operatorRefund/views/DispatchDashOpOperatorRefund.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
    ]
}