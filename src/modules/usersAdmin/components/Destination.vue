<template>
  <tr @click="$emit('on:open', { id })">
      <td >{{ destination.nombre }}</td>
      <td>{{ destination.id }}</td>
  </tr>
</template>

<script>
import { ref } from 'vue';


export default {
  emits: ['on:open'],
  props: {
      destination: {
          type: Object,
          required: true,
      },
  },

  setup(props) {

      const destination = ref(props.destination);
      const id = props.destination.id;

      return {
          destination,
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