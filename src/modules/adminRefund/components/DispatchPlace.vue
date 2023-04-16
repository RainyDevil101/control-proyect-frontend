<template>
    <tr @click="$emit('on:open', { id })">
        <td >{{ dispatchPlace.place }}</td>
        <td>{{ dispatchPlace.id }}</td>
    </tr>
</template>

<script>
import { ref } from 'vue';


export default {
    emits: ['on:open'],
    props: {
        dispatchPlace: {
            type: Object,
            required: true,
        },
    },

    setup(props) {

        const dispatchPlace = ref(props.dispatchPlace);
        const id = props.dispatchPlace.id;

        return {
            dispatchPlace,
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