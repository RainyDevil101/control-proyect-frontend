<template>
  <tr class="completa-wrapper" @click="$router.push({ name: 'completed-refund', params: { id: completaFiltered.id } })">
    <td>{{ completaFiltered.statusDelivery }}</td>
    <td>{{ completaFiltered.id }}</td>
  </tr>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: {
    completaFiltered: {
      type: Object,
      required: true,
    },
  },

  setup(props) {

    const completaFiltered = ref(props.completaFiltered);

    return {
      completaFiltered,
    };
  },
};
</script>

<style lang="scss" scoped>

td {
  border: 1px solid #ddd;
  padding: 8px;
  word-wrap: break-word;
  background-color: rgb(201, 201, 201);
};

</style>