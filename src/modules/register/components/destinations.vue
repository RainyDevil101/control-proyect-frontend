<template>
  <tr @click="$emit('on:open', { id })">
      <td class="id">{{ destination.id }}</td>
      <td >{{ destination.name }}</td>
      <td>{{ destination.division_code }}</td>
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

      const id = props.destination.id;
      const destination = ref(props.destination);
      return {
          id,
          destination
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