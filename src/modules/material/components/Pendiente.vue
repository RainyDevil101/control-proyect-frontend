<template>
  <tr class="cursor-pointer" @click="$router.push({ name : 'dispatch-material', params: { id: pendiente.id } })">
      <td >{{ pendiente.code }}</td>
      <td>{{ pendiente.transport_number }}</td>
      <td>{{ pendiente.id }}</td>
  </tr>
</template>

<script>
import { ref } from 'vue';


export default {
  emits: ['on:open'],
  props: {
      pendiente: {
          type: Object,
          required: true,
      },
  },

  setup(props) {

      const pendiente = ref(props.pendiente);
      const id = props.pendiente.id;

      return {
          pendiente,
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