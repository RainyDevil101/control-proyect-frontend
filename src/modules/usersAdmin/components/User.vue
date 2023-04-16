<template>
    <tr @click="$emit('on:open', { id })">
        <td class="id">{{ user.id }}</td>
        <td>{{ user.fullname }}</td>
        <td>{{ user.fulllastname }}</td>
        <td>{{ user.rut }}</td>
        <td>{{ user.position }}</td>
    </tr>
</template>

<script>
import { ref } from 'vue';


export default {
    emits: ['on:open'],
    props: {
        user: {
            type: Object,
            required: true,
        },
    },

    setup(props) {

        const id = props.user.id;
        const user = ref(props.user);
        return {
            id,
            user
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