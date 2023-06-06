<template>
  <tr class="cursor-pointer" @click="$router.push({ name: 'stored-refund', params: { id: almacenadaFiltered.id } })">
    <td>{{ almacenadaFiltered.statusDelivery }}</td>
    <td>{{ almacenadaFiltered.id }}</td>
  </tr>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: {
    almacenadaFiltered: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const almacenadaFiltered = ref(props.almacenadaFiltered);

    return {
      almacenadaFiltered,
    };
  },
};
</script>

<style lang="scss" scoped>

td {
  border: 1px solid #ddd;
  padding: 8px;
  word-wrap: break-word;
  background-color: tomato;
}

</style>