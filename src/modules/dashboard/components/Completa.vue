<template>
  <tr class="cursor-pointer" @click="$router.push({ name : 'completed-material', params: { id: completa.id } })">
      <td>{{ completa.transport_number }}</td>
      <td>{{ completa.id }}</td>
  </tr>
</template>

<script>
import { ref } from 'vue';


export default {
  emits: ['on:open'],
  props: {
      completa: {
          type: Object,
          required: true,
      },
  },

  setup(props) {

      const completa = ref(props.completa);
      const id = props.completa.id;

      return {
          completa,
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