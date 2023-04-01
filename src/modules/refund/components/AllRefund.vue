<template>
    <div class="allRefund-wrapper" :class="[allRefund.date_out === 'PENDIENTE' ? incompleted : completed]" @click="
        [
            allRefund.date_out === 'PENDIENTE'
                ? $router.push({
                    name: 'dispatch-refund',
                    params: { id: allRefund.id },
                })
                : $router.push({
                    name: 'dispatch-refund',
                    params: { id: allRefund.id },
                }),
        ]
    ">
        <span>ID: <b>{{ allRefund.id }}</b> |
        </span>
        <span>FECHA DE REGISTRO: <b>{{ allRefund.date_in }}</b> |
        </span>
        <span>FECHA DE DESPACHO <b>{{ allRefund.date_out }}</b></span>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
    props: {
        allRefund: {
            type: Object,
            required: true,
        },
    },

    setup(props) {
        const allRefund = ref(props.allRefund);
        const incompleted = ref("incompleted");
        const completed = ref("completed");

        return {
            allRefund,
            incompleted,
            completed,
        };
    },
};
</script>

<style lang="scss" scoped>
.allRefund-wrapper {
  background-color: rgb(201, 201, 201);
  padding: 10px;
  margin: 4px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.allRefund-wrapper:hover {
  background-color: rgb(155, 155, 155);
}

.incompleted {
  background-color: tomato;

}

.incompleted:hover {
    background-color: rgb(255, 83, 52);
}

</style>