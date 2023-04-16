<template>
  <tr class="cursor-pointer" @click="$router.push({ name : 'dispatch-dash-refund', params: { id: pendienteFiltered.id } })">
      <td>{{ pendienteFiltered.code }}</td>
      <td>{{ pendienteFiltered.id }}</td>
  </tr>
</template>

<script>
import { ref } from 'vue';


export default {
  emits: ['on:open'],
  props: {
      pendienteFiltered: {
          type: Object,
          required: true,
      },
  },

  setup(props) {

      const pendienteFiltered = ref(props.pendienteFiltered);
      const id = props.pendienteFiltered.id;

      return {
          pendienteFiltered,
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
  background-color: tomato;
}

</style>