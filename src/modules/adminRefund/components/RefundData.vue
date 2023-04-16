<template>
    <tr @click="$emit('on:open', { id })">
        <td class="id">{{ refund.id }}</td>
        <td >{{ refund.code }}</td>
        <td>{{ refund.quantity }}</td>
        <td>{{ refund.packageQuantity }}</td>
        <td>{{ refund.possibleUbication }}</td>
        <td>{{ refund.patent }}</td>
        <td>{{ refund.fullname }} {{ refund.fulllastname }}</td>
        <td>{{ new Date(refund.date_in).toLocaleString()}}</td>
        <td>{{ new Date(refund.finish_date).toLocaleString()}}</td>
    </tr>
</template>

<script>
import { ref } from 'vue';


export default {
    emits: ['on:open'],
    props: {
        refund: {
            type: Object,
            required: true,
        },
    },

    setup(props) {

        const id = props.refund.id;
        const refund = ref(props.refund);
        return {
            id,
            refund
        }
    }
}
</script>

<style lang="scss" scoped>

td {
    border: 1px solid #ddd;
    padding: 8px;
    word-wrap: break-word;
}

</style>