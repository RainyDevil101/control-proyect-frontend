<template>
    <tr>
        <td @click="$emit('on:open', { id })">{{ client.name }}</td>
        <td class="id">{{ client.id }}</td>
    </tr>
</template>

<script>
import { ref } from 'vue';


export default {
    emits: ['on:open'],
    props: {
        client: {
            type: Object,
            required: true,
        },
    },

    setup(props) {

        const client = ref(props.client);
        const id = props.client.id;

        return {
            client,
            id
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